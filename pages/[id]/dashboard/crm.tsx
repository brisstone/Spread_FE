import { useState } from "react";
import Card, { CardContent, CardHeader } from "@/components/card";
import CardPanel from "@/components/crm/card-panel";
import OnboardingQuestions from "@/components/crm/onboarding";
import Layout, { LayoutHeader } from "@/components/layout";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import ClientsTable from "@/components/clients-table";
import SalesTurnoverChart from "@/components/analytics/sales-turnover";

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

        <div className="mt-7 grow flex flex-col">
          <TabPanel index={0} value={tabIndex}>
            <CardPanel />
          </TabPanel>

          <TabPanel index={1} value={tabIndex}>
            <SalesTurnoverChart className="w-full mt-5" />

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
