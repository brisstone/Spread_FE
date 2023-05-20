import Button from "@/components/button";
import Card, { CardContent, CardHeader } from "@/components/card";
import CardPanel from "@/components/crm/card-panel";
import OnboardingQuestions from "@/components/crm/onboarding";
import IconButton from "@/components/iconbutton";
import Input from "@/components/input";
import KPI from "@/components/kpi";
import Layout, { LayoutHeader } from "@/components/layout";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import CustomTable from "@/components/table";
import { Props } from "@/types/props";
import { AreaChart } from "@tremor/react";
import Image from "next/image";
import { useState } from "react";

const data = [
  {
    Month: "Jan 21",
    "Gross Volume": 2890,
    "Successful Payments": 2400,
    Customers: 4938,
  },
  {
    Month: "Feb 21",
    "Gross Volume": 1890,
    "Successful Payments": 1398,
    Customers: 2938,
  },
  {
    Month: "Mar 21",
    "Gross Volume": 2190,
    "Successful Payments": 1900,
    Customers: 1638,
  },
  {
    Month: "Apr 21",
    "Gross Volume": 3470,
    "Successful Payments": 3908,
    Customers: 2138,
  },
  {
    Month: "May 21",
    "Gross Volume": 2170,
    "Successful Payments": 4800,
    Customers: 2142,
  },
  {
    Month: "Jun 21",
    "Gross Volume": 3170,
    "Successful Payments": 3800,
    Customers: 5120,
  },
  {
    Month: "Jul 21",
    "Gross Volume": 3490,
    "Successful Payments": 4300,
    Customers: 3890,
  },
  {
    Month: "Aug 21",
    "Gross Volume": 2190,
    "Successful Payments": 4100,
    Customers: 3165,
  },
  {
    Month: "Sep 21",
    "Gross Volume": 3344,
    "Successful Payments": 4934,
    Customers: 1945,
  },
  {
    Month: "Oct 21",
    "Gross Volume": 1564,
    "Successful Payments": 1245,
    Customers: 2345,
  },
  {
    Month: "Nov 21",
    "Gross Volume": 3345,
    "Successful Payments": 2654,
    Customers: 4845,
  },
  {
    Month: "Dec 21",
    "Gross Volume": 2740,
    "Successful Payments": 3421,
    Customers: 2945,
  },
  {
    Month: "Jan 22",
    "Gross Volume": 3890,
    "Successful Payments": 2980,
    Customers: 2645,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

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
            <Card className="w-full mt-5">
              <div className="p-7">
                <CardHeader
                  title="Chiffre d’Affaires 💰"
                  subTitle="(+5k) ce mois ci en 2023"
                />

                <CardContent>
                  <AreaChart
                    className="mt-8 h-44"
                    data={data}
                    categories={["Gross Volume"]}
                    index="Month"
                    colors={["indigo"]}
                    valueFormatter={valueFormatter}
                    showYAxis={false}
                    showLegend={false}
                  />
                </CardContent>
              </div>
            </Card>

            <Card className="w-full mt-5">
              <div className="p-7">
                <CardHeader
                  title="Projets ⌛"
                  subTitle="30 Accomplis ce mois ci."
                />

                <CardContent>
                  <CustomTable />
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
