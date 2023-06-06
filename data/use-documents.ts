import { getPgKey } from "@/lib/util";
import { DocumentFile } from "@/types/general";
import useSWRInfinite from "swr/infinite";

export default function useDocuments(folderId: string | null) {
  const swr= useSWRInfinite<DocumentFile[]>(
    getPgKey<DocumentFile>(() =>
      folderId ? `/documents/files?folderId=${folderId}` : null
    )
  );

  return swr
}