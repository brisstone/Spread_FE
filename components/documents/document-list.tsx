// import { Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { GradientHDivider } from "@/components/divider";
import { ReactNode, useMemo, useState } from "react";
import { ScrollableList } from "@/components/list";
import Button from "@/components/button";
import { DocumentFile, DocumentFolder } from "@/types/general";
import Fetched from "@/components/fetched";
import { Feedback } from "@/components/feedback";
import { deleteDocument, getDocumentUploadSignedUrl, uploadToS3 } from "@/services";
import { useAlert } from "@/contexts/alert-context";
import { AlertType } from "@/types/enum";
import { swrInfiniteMutate } from "@/lib/util";
import { DocumentItem, FolderName } from "./document-utils";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useDocuments from "@/data/use-documents";
import { ConfirmationModal } from "../modal";

import utilStyles from "@/styles/utils.module.css";

export default function DocumentList(props: { selected: string | null }) {
  const {
    data: items,
    error: itemsError,
    isLoading: itemsLoading,
    mutate,
    setSize,
  } = useDocuments(props.selected);

  const { observerTarget } = useInfiniteScroll(setSize);

  const { pushAlert } = useAlert();

  const [sFileId, setSFileId] = useState<string | null>(null);

  const selectedFile = useMemo(
    () => (items ? items.flat().find((f) => f.id === sFileId) : null),
    [items, sFileId]
  );

  const [uploading, setUploading] = useState(false);
  const [dOpen, setDOpen] = useState<string | null>(null);

  return (
    <>
      <ConfirmationModal
        open={!!dOpen}
        handleClose={() => setDOpen(null)}
        onConfirm={(s) => {
          // dOpen is the id of the folder about to be deleted
          if (!dOpen) return;
          s(true); // indicate action is running by setting internal confirming state

          deleteDocument(dOpen)
            .then(() => {
              s(false);
              mutate((prev) => {
                if (!prev) return prev;
                const copy = prev.map((c) => c.filter((d) => d.id !== dOpen));

                return copy;
              });
              pushAlert("Document supprimé avec succès", AlertType.SUCCESS);
              setDOpen(null);
            })
            .catch(() => {
              s(false);
              pushAlert("Impossible de supprimer le document", AlertType.ERROR);
              setDOpen(null);
            });
        }}
        onCancel={() => {
          setDOpen(null);
        }}
        text="Voulez-vous supprimer ce dossier ?"
        question
      />
      <div className="flex flex-col ml-12 first:ml-0">
        <div className="px-3">
          <h2 className="text-[24px] leading-[24px]">Documents 📄</h2>
          <GradientHDivider className="mt-6" />
        </div>

        {/* <div className="mt-5"> */}
        <div className="relative grow">
          <Fetched
            error={itemsError}
            isLoading={itemsLoading}
            data={items}
            dataComp={(fldrs) =>
              fldrs.length > 0 ? (
                <ScrollableList className="min-w-[25%] basis-1/4 h-full mt-5">
                  {fldrs.flat().map((f) => (
                    <DocumentItem
                      key={f.id}
                      selected={sFileId === f.id}
                      onClick={() => setSFileId(f.id)}
                      onDelete={() => {
                        setDOpen(f.id);
                      }}
                      primary={<FolderName name={f.name} />}
                      secondary={
                        <p className="text-xs text-[#84818A]">
                          {new Date(f.updatedAt).toLocaleDateString()}
                        </p>
                      }
                    />
                  ))}
                  <li className="h-px" ref={observerTarget}></li>
                </ScrollableList>
              ) : (
                <Feedback msg="Vous n'avez pas encore créé de dossier" />
              )
            }
          />
        </div>
        {props.selected && (
          <div className="mt-5">
            <label htmlFor="new-file" className="block cursor-pointer">
              <input
                id="new-file"
                disabled={uploading}
                multiple
                type="file"
                className="hidden"
                onChange={async (e) => {
                  e.preventDefault();

                  console.log("CHANGING...", e);
                  const [file] = e.target.files ? e.target.files : [];

                  if (!file) return;

                  let uploadData: {
                    doc: DocumentFile;
                    url: string;
                  } | null = null;

                  setUploading(true);

                  try {
                    uploadData = await getDocumentUploadSignedUrl({
                      name: file.name,
                      fileType: file.type,
                      folderId: props.selected!,
                    });

                    if (!uploadData) throw new Error('Upload data not found')

                    await uploadToS3(uploadData.url, file);

                    mutate(swrInfiniteMutate(uploadData.doc, "top"));
                    setUploading(false);
                    pushAlert("Fichier importé", AlertType.SUCCESS);
                  } catch (e) {
                    // if entry was created in backend DB, but maybe it wasn't uploaded to s3, delete db entry
                    if (uploadData) {
                      await deleteDocument(
                        uploadData.doc.id,
                        "uploadFailure"
                      ).catch((e) => {
                        setUploading(false);
                        pushAlert("Quelque chose s'est mal passé");
                      });
                    }
                    setUploading(false);
                    pushAlert("Quelque chose s'est mal passé");
                  }
                }}
              />

              <Button
                loading={uploading}
                iconWidth={22}
                iconHeight={16}
                type="submit"
                iconUrl="/images/folder-add.svg"
                className="shadow-none !text-base w-full !py-6 mt-5 pointer-events-none"
              >
                Ajouter un Document
              </Button>
            </label>
          </div>
        )}
        {/* </div> */}
      </div>
      <div className="basis-1/2 ml-12 relative h-full">
        {selectedFile && (
          <>
            {selectedFile.fileType.includes("image") ? (
              <img
                src={selectedFile.url}
                // width={0}
                // height={0}
                // sizes="100%"
                className="object-contain fill w-full h-full"
                alt="image file"
              />
            ) : (
              <a href={selectedFile.url} target="_blank" rel="noopener noreferrer" className={`${utilStyles.absoluteCentered}`}>
                <Button>Afficher le document</Button>
              </a>
            )}
            {/* {selectedFile.fileType.includes("pdf") && (
              <Viewer
                fileUrl={selectedFile.url}
                plugins={[
                  // Register plugins
                  defaultLayoutPluginInstance,
                ]}
              />
            )} */}
          </>
        )}
      </div>
    </>
  );
}
