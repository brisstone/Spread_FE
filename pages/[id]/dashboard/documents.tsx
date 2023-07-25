import useSWR, { mutate as globalMutate } from "swr";
import useSWRInfinite from "swr/infinite";
import Card from "@/components/card";
import { GradientHDivider } from "@/components/divider";
import Glass from "@/components/glass";
import Layout from "@/components/layout";
import Image from "next/image";
import { ReactNode, useMemo, useState } from "react";
import { ScrollableList } from "@/components/list";
import Button from "@/components/button";
import CreateDocumentFolder from "@/components/documents/create-folder";
import { DocumentFile, DocumentFolder } from "@/types/general";
import Fetched from "@/components/fetched";
import { Feedback } from "@/components/feedback";
import {
  deleteDocument,
  deleteFolder,
  getUploadSignedUrl,
  uploadToS3,
} from "@/services";
import { useAlert } from "@/contexts/alert-context";
import { AlertType } from "@/types/enum";
import { getPgKey } from "@/lib/util";
import {
  DocumentItem,
  FolderName,
} from "@/components/documents/document-utils";
import DocumentList from "@/components/documents/document-list";
import { ConfirmationModal } from "@/components/modal";
import useDocuments from "@/data/use-documents";

function FolderTag() {
  const {
    data: folders,
    isLoading: foldersLoading,
    error: foldersError,
    mutate,
  } = useSWR<DocumentFolder[]>("/documents/folders");
  return (
    <div className="px-3 py-1 bg-white2 w-fit flex justify-center items-center rounded-[4px]">
      <span className="text-[10px] leading-[14px] text-[#778599]">{folders?.length ?? 0} Docs</span>
    </div>
  );
}

function SectionButton(props: { text?: string; onClick?: () => any }) {
  return (
    <Button
      // loading={}
      iconWidth={22}
      iconHeight={16}
      type="submit"
      iconUrl="/images/folder-add.svg"
      className="shadow-none !text-base w-full !py-6 mt-5"
      onClick={props.onClick}
    >
      {props.text || "Ajouter un Dossier"}
    </Button>
  );
}

function FolderSection(props: {
  selected?: string | null;
  onSelect: (s: string) => any;
}) {
  const {
    data: folders,
    isLoading: foldersLoading,
    error: foldersError,
    mutate,
  } = useSWR<DocumentFolder[]>("/documents/folders");

  const [fmOpen, setFMOpen] = useState(false);
  const [dOpen, setDOpen] = useState<string | null>(null);

  const { pushAlert } = useAlert();

  const { mutate: documentsMutate } = useDocuments(dOpen);

  return (
    <>
      <CreateDocumentFolder
        open={fmOpen}
        handleClose={() => setFMOpen(false)}
      />
      <ConfirmationModal
        open={!!dOpen}
        handleClose={() => setDOpen(null)}
        onConfirm={(s) => {
          // dOpen is the id of the folder about to be deleted
          if (!dOpen) return;

          s(true); // indicate action is running by setting internal confirming state
          deleteFolder(dOpen)
            .then(() => {
              s(false);
              mutate((prev) => prev?.filter((i) => i.id !== dOpen));
              documentsMutate([[]]); // clear documents
              pushAlert("Dossier supprimé avec succès", AlertType.SUCCESS);
              setDOpen(null);
            })
            .catch(() => {
              s(false);
              pushAlert("Impossible de supprimer le dossier", AlertType.ERROR);
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
          <h2 className="text-[24px] leading-[24px]">Dossiers 📁</h2>
          <GradientHDivider className="mt-6" />
        </div>

        {/* <div className="mt-5"> */}
        <div className="relative grow">
          <Fetched
            error={foldersError}
            isLoading={foldersLoading}
            data={folders}
            dataComp={(fldrs) =>
              fldrs.length > 0 ? (
                <ScrollableList className="min-w-[25%] basis-1/4 h-full mt-5">
                  {fldrs.map((f) => (
                    <DocumentItem
                      key={f.id}
                      selected={props.selected === f.id}
                      onClick={() => props.onSelect(f.id)}
                      primary={<FolderName name={f.name} includeIcon />}
                      secondary={<FolderTag />}
                      onDelete={() => {
                        setDOpen(f.id);
                      }}
                    />
                  ))}
                </ScrollableList>
              ) : (
                <Feedback msg="Vous n'avez pas encore créé de dossier" />
              )
            }
          />
        </div>
        <div className="mt-5">
          <SectionButton onClick={() => setFMOpen(true)} />
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export function DocumentFileItem() {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <Image
        src="/images/file-grey.svg"
        height={50}
        width={50}
        alt="folder-icon"
      />
      <p className="text-base text-center">textsdjdo.png</p>
    </div>
  );
}

export default function Documents() {
  const [sFolder, setSFolder] = useState<string | null>(null); // selected folder

  return (
    <Layout header="Documents & SOPs 📖">
      <Card className="mt-7 relative flex flex-col grow h-full p-14">
        <div className="h-full flex items-stretch">
          <FolderSection selected={sFolder} onSelect={setSFolder} />
          <DocumentList selected={sFolder} />
        </div>
      </Card>
    </Layout>
  );
}
