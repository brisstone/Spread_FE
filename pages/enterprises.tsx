import useSWR from "swr";
import Button from "@/components/button";
import Fetched from "@/components/fetched";
import Glass from "@/components/glass";
import Onboarding from "@/components/onboarding";
import useBaseUser from "@/data/use-base-user";
import Image from "next/image";
import Link from "next/link";
import { UserWithEnterprise } from "@/types/general";
import { Feedback } from "@/components/feedback";
import { baseUserTokenId, roleMap } from "@/types/enum";
import { useEffect, useState } from "react";
import { getUserEnterprises } from "@/services";
import { authFetcher } from "@/lib/fetcher";

export default function Enterprises() {
  // const { user, error: userError, isLoading } = useBaseUser();
  const {
    data,
    error,
    isLoading: userWithEntLoading,
  } = useSWR<UserWithEnterprise[]>(["/auth/user/enterprises", baseUserTokenId], authFetcher);

  return (
    <Onboarding>
      <Fetched
        error={error}
        isLoading={userWithEntLoading}
        data={data}
        dataComp={(d) => (
          <Glass>
            <div className="py-20 px-12 w-[452.5px]">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center rounded-full w-14 h-14 bg-btn">
                  <Image
                    priority
                    src="/images/key.svg"
                    height={21}
                    width={21}
                    alt="key"
                  />
                </div>

                <div className="w-full">
                  <h1 className="text-3xl mt-6 text-center">Organisations</h1>
                  {/* <p className="mt-6 text-[16px] text-obsec text-center">
                <span className="leading-6">djodjsdj j</span>
                <br />
                <span>sids id0i0did</span>
              </p> */}
                </div>

                <div className="w-full mt-8">
                  {d.length > 0 ? (
                    <ul>
                      {d.map((ue) => (
                        <Link href={`/${ue.enterprise.id}/login?email=${ue.baseUser.email}`} key={ue.id}>
                          <li className="cursor-pointer p-4 hover:bg-[rgba(255,255,255,0.2)] hover:rounded-lg hover:border-none border-y border-divider">
                            <p className="text-base">{ue.enterprise.name}</p>
                            <p className="text-xs text-subtitle">
                              {roleMap[ue.enterpriseRole.name]}
                            </p>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <Feedback
                      className="mt-5"
                      noAbsolute
                      msg="Vous ne faites pas encore partie d'une organisation"
                    />
                  )}
                  {d.length < 1 && (
                    <Link href="/create-enterprise">
                      <Button
                        className="w-full shadow-btn2"
                        type="submit"
                        // onClick={props.onButtonClick}
                        // loading={props.isSubmitting}
                      >
                        Créer une organisation
                      </Button>
                    </Link>
                  )}
                  <div className="w-full mt-6"></div>
                </div>
              </div>
            </div>
          </Glass>
        )}
      />
    </Onboarding>
  );
}
