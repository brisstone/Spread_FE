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

export default function Affiliation() {
  const { data, isLoading, error } = useSWR<string>(
    "/enterprise/referral/code"
  );

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
        <div className="w-full grow flex justify-center items-center">
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl text-center">
                Partagez votre code promotionnel 💰
              </h2>

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
                    value={data}
                  />
                  <Button
                    onClick={async () => {
                      navigator.clipboard
                        .writeText(data)
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

      <TabPanel index={1} value={newTabIndex}>oooojjjujujjjj</TabPanel>
    </Layout>
  );
}
