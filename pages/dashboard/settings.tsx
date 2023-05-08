import Button from "@/components/button";
import Card from "@/components/card";
import Input, { TextArea } from "@/components/input";
import Layout from "@/components/layout";
import ProfileSettings from "@/components/settings/Profile";
import EnterpriseSettings from "@/components/settings/enterprise";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import { HeaderSubtitle, Props } from "@/types/props";
import Image from "next/image";
import { useState } from "react";


export default function Settings() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout header="Paramètres ⚙️">
      <div className="flex flex-col w-full grow sticky">
        <Tab
          value={tabIndex}
          onChange={(newValue) => {
            console.log("new value", newValue);
            setTabIndex(newValue);
          }}
          className="w-full"
        >
          <TabItem>Informations</TabItem>
          <TabItem>Profile</TabItem>
          <TabItem>Mot de passe</TabItem>
          <TabItem>Équipes</TabItem>
          <TabItem>Plan</TabItem>
        </Tab>

        <div className="flex flex-col mt-7 grow">
          <Card className="flex flex-col grow sticky py-5 px-6">
            <TabPanel index={0} value={tabIndex}>
              <EnterpriseSettings />
            </TabPanel>
            <TabPanel index={1} value={tabIndex}>
              <ProfileSettings />
            </TabPanel>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
