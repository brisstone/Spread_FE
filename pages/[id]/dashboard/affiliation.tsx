/* eslint-disable react/jsx-key */
import useSWR from "swr";
import Button from "@/components/button";
import Card from "@/components/card";
import Input from "@/components/input";
import Layout from "@/components/layout";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { Feedback } from "@/components/feedback";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import { useState } from "react";
import Router from "next/router";
import {
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableRow,
  TableRowCell,
} from "@/components/table";

export default function Affiliation() {
  // const { id } = Router?.query;

  // console.log(Router?.query,'RouterqueryRouterquery');

  const { data, isLoading, error } = useSWR<string>(
    "/enterprise/referral/code"
  );

  const {
    data: referrals,
    isLoading: referralLoading,
    error: referralError,
  } = useSWR<string>("/referral");

  // console.log(referrals,'referralsreferrals');

  const [newTabIndex, setNewTabIndex] = useState(0);

  return (
    <Layout header="Affiliation">
      <Tab
        value={newTabIndex}
        onChange={(newValue) => {
          console.log("new value", newValue);
          setNewTabIndex(newValue);
        }}
        className="w-full"
      >
        <TabItem>Référence</TabItem>
        <TabItem>Gains de parrainage</TabItem>
      </Tab>

      <TabPanel index={0} value={newTabIndex}>
        <div className="w-full grow flex justify-center items-center mt-[50px]">
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl text-center">
                Partagez votre code promotionnel 💰
              </h2>
              <h5 className="text-[15px] text-center mt-[20px]">
                Gagnez 10% sur la vente d'abonnement et la personne qui utilise
                votre code
              </h5>
              <h5 className="text-[15px] text-center">
                bénéficie également de 10 % de réduction sur l'abonnement.
              </h5>

              <Image
                src="/images/logo.png"
                height={111}
                width={111}
                alt="company profile image"
                className="mt-2"
              />
            </div>
            <Card className="lg:min-w-[678px] lg:min-h-[400px] mt-2 flex flex-col justify-center items-center">
              {isLoading && (
                <ClipLoader
                  color="#fff"
                  loading={true}
                  cssOverride={{
                    display: "block",
                  }}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
              {error && (
                <Feedback
                  noAbsolute
                  msg="Impossible de récupérer le code d'affiliation"
                />
              )}
              {data && (
                <>
                  <h4 className="text-white text-lg">Merci à vous !</h4>
                  <Input
                    disabled
                    className="my-4 lg:min-w-[417px]"
                    value={`${window.location.host}/login/${data}`}
                  />
                  <Button
                    onClick={async () => {
                      navigator.clipboard
                        .writeText(`${window.location.host}/login/${data}`)
                        .catch((e) => console.error("Failed to copy: ", e));
                    }}
                    className="font-[600] lg:min-w-[417px] shadow-btn2"
                  >
                    Copier mon code promotionnel
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </TabPanel>

      <TabPanel index={1} value={newTabIndex}>
        <div className="w-full grow flex text-[white] justify-center mt-[5%]">
          <div>
          {referrals?.length == 0 && <>vous n'avez actuellement aucune référence</>}
            <table className="table-auto w-full">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>S/N</TableHeadCell>
                  <TableHeadCell>${`ID de l'utilisateur`}</TableHeadCell>
                  <TableHeadCell>Nom</TableHeadCell>
                  <TableHeadCell>utilisateur abonné</TableHeadCell>
                  <TableHeadCell>prime</TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <tbody>
                {/* //@ts-ignore */}
         
                {referrals?.map((referral: any, index: number) => (
                  <TableRow>
                    <TableRowCell>
                      <div className="flex">
                        <span className="text-base ml-4">{index + 1}</span>
                      </div>
                    </TableRowCell>
                    <TableRowCell>
                      <div className="flex">
                        <span className="text-base ml-4">
                          {referral.referredUserId}
                        </span>
                      </div>
                    </TableRowCell>
                    <TableRowCell>
                      <div className="flex">
                        <span className="text-base ml-4">
                          {referral.name ?? "N/A"}
                        </span>
                      </div>
                    </TableRowCell>
                    <TableRowCell>
                      <div className="flex">
                        <span className="text-base ml-4">
                          {" "}
                          {referral.referredSubscribed == false ? "No" : "Yes"}
                        </span>
                      </div>
                    </TableRowCell>
                    <TableRowCell>
                      <div className="flex">
                        <span className="text-base ml-4">
                          {referral.amount || "0"}
                        </span>
                      </div>
                    </TableRowCell>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabPanel>
    </Layout>
  );
}
