import { StorageEnum } from "@/types/enum";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const context = localStorage.getItem(StorageEnum.ENT_CONTEXT);

    if (!context || context === 'noent') {
      router.replace('/login');
    } else {
      router.replace(`/${context}/dashboard`);
    }
  }, [router]);

  return (
    <p className="text-base">Chargement...</p>
  )
}
