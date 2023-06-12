import { CRMLead } from "@/types/general";
import useSWR from "swr";

export default function useLeads(categoryId?: string) {
  const d = useSWR<CRMLead[]>(() =>
    categoryId ? `/crm/leads?categoryId=${categoryId}` : null
  );

  return d;
}
