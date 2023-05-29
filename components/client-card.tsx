import Image from "next/image";
import Glass from "./glass";
import { GradientHDivider } from "./divider";
import Link from "next/link";
import { Client } from "@/types/general";
import useUserAndEnterprise from "@/data/user-user-enterprise";

export default function ClientCard({ client }: { client: Client }) {
  const { enterprise } = useUserAndEnterprise();

  return (
    <Glass className="py-10 px-14">
      <Link href={`/${enterprise?.id}/dashboard/clients/${client.id}`} className="block w-full">
        <div className="w-full flex gap-4 items-center">
          <Image
            src="/images/genericavatar.png"
            height={40}
            width={40}
            alt="avatar"
            className="rounded-full"
          />

          <p className="text-[23px] leading-[28px] tracking-[-0.19159px]">
            {client.name}
          </p>
        </div>
        <div className="mt-8">
          <p className="text-base">{client.brief}</p>

          <GradientHDivider className="my-8" />

          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilecompany.png"
              height={26}
              width={26}
              alt="company profile image"
              className="rounded-full border border-solid border-white"
            />

            <p className="text-base">Depuis 1j</p>
          </div>
        </div>
      </Link>
    </Glass>
  );
}
