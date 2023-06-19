import { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import Card, { CardContent, CardHeader } from "@/components/card";
import CardPanel from "@/components/crm/card-panel";
import OnboardingQuestions from "@/components/crm/onboarding";
import IconButton from "@/components/iconbutton";
import Input from "@/components/input";
import KPI from "@/components/kpi";
import Layout, { LayoutHeader } from "@/components/layout";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import { Props } from "@/types/props";
import { AreaChart } from "@tremor/react";
import ClientsTable from "@/components/clients-table";
import dummyChartData from "@/data/dummy-chart";
import { valueFormatter } from "@/lib/util";
import ClientTurnoverChart from "../../../components/analytics/client-turnover";

export default function CRM() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout header="CRM - Leads 💸">
      <div className="flex flex-col w-full grow sticky">
        <Tab
          value={tabIndex}
          onChange={(newValue) => {
            console.log("new value", newValue);
            setTabIndex(newValue);
          }}
          className="w-full"
        >
          <TabItem>💸 Leads</TabItem>
          <TabItem>📈 Statistiques</TabItem>
          <TabItem>🛟 Onboarding</TabItem>
        </Tab>

        <div className="mt-7">
          <TabPanel index={0} value={tabIndex}>
            <CardPanel />
          </TabPanel>

          <TabPanel index={1} value={tabIndex}>
            <ClientTurnoverChart className="w-full mt-5" />

            <Card className="w-full mt-5">
              <div className="p-7">
                <CardHeader title="Clients ⌛" subTitle="" />

                <CardContent>
                  <ClientsTable />
                </CardContent>
              </div>
            </Card>
          </TabPanel>

          <TabPanel index={2} value={tabIndex}>
            <OnboardingQuestions />
          </TabPanel>
        </div>
      </div>
    </Layout>
  );
}

CRM.Layout = Layout;
