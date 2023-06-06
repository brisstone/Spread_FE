import Button from "@/components/button";
import Card, { CardContent, CardHeader } from "@/components/card";
import Input, { TextArea } from "@/components/input";
import CreateInvoice from "@/components/invoicing/create-invoice";
import {InvoiceList} from "@/components/invoicing/invoice-list";
import KPI from "@/components/kpi";
import Layout from "@/components/layout";
import Select, { SelectOption } from "@/components/select";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import dummyChartData from "@/data/dummy-chart";
import { valueFormatter } from "@/lib/util";
import { AreaChart } from "@tremor/react";
import { useState } from "react";

export default function Invoicing() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout header="Facturation 🏦">
      <div className="flex flex-col w-full grow sticky">
        <Tab
          value={tabIndex}
          onChange={(newValue) => {
            console.log("new value", newValue);
            setTabIndex(newValue);
          }}
          className="w-full"
        >
          <TabItem>Facturation</TabItem>
          <TabItem>Sommaire</TabItem>
          <TabItem>Abonnements</TabItem>
          <TabItem>Rapports</TabItem>
          <TabItem>Clients</TabItem>
          <TabItem>Réglages</TabItem>
        </Tab>

        <TabPanel index={0} value={tabIndex}>
          <Card className="mt-7 relative flex flex-col grow h-full">
            <CreateInvoice onCreate={() => setTabIndex} />
          </Card>
        </TabPanel>

        <TabPanel index={1} value={tabIndex}>
          <Card className="mt-7 relative flex flex-col grow h-full">
            <InvoiceList />
          </Card>
        </TabPanel>

        <TabPanel index={4} value={tabIndex}>
          <div className="w-full mt-6">
            <div className="flex w-full gap-6">
              <KPI className="grow" />
              <KPI className="grow" />
              <KPI className="grow" />
              <KPI className="grow" />
            </div>

            <Card className="w-full mt-5">
              <div className="p-7">
                <CardHeader
                  title="Chiffre d’Affaires 💰"
                  subTitle="(+5k) ce mois ci en 2023"
                />

                <CardContent>
                  <AreaChart
                    className="mt-8 h-44"
                    data={dummyChartData}
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
          </div>
        </TabPanel>
        <TabPanel index={5} value={tabIndex}>
          <Card className="mt-7 relative flex flex-col grow h-full px-6 py-14">
            <div className="w-full p-7">
              <h3 className="text-[22px] leading-[26px]">
                Paramètres de facturation par défaut
              </h3>
              <div className="mt-10">
                <div className="flex gap-4 items-center">
                  <Input
                    header="Titre de la facture"
                    placeholder="Invoice From"
                    smallerYPadding
                  />
                  <Input
                    header="Numéro de facture"
                    placeholder="1001"
                    type="number"
                    smallerYPadding
                  />
                  <Select header="Devise">
                    <SelectOption value="USD">USD</SelectOption>
                    <SelectOption value="EURO">EURO</SelectOption>
                  </Select>
                </div>

                <div className="flex gap-4 items-center mt-3">
                  <Input
                    header="Titre de la facture"
                    placeholder="Invoice From"
                    smallerYPadding
                  />
                  <Input
                    header="Numéro de facture"
                    placeholder="1001"
                    type="number"
                    smallerYPadding
                  />
                  <Input
                    header="TVA"
                    className="max-w-[95px]"
                    placeholder="%"
                    type="number"
                    smallerYPadding
                  />
                </div>

                <TextArea
                  header={
                    <>
                      <span>Détails de facturation </span>
                      <span className="text-icon">(Max 250 mots: 0/250)</span>
                    </>
                  }
                  placeholder="Vos détails de facturation ... (optionnel)"
                  className="mt-5 max-w-[75%]"
                />

                <TextArea
                  header={
                    <>
                      <span>Notes de facturation </span>
                      <span className="text-icon">(Max 250 mots: 0/250)</span>
                    </>
                  }
                  placeholder="Vos détails de facturation ... (optionnel)"
                  className="mt-5 max-w-[75%]"
                />

                <div className="mt-10 flex gap-6">
                  <Button
                    // loading={}
                    type="submit"
                    iconUrl="/images/plus-black.svg"
                    className="shadow-none !text-base bg-white text-black"
                  >
                    Créer
                  </Button>
                  <Button
                    // loading={}
                    type="submit"
                    iconUrl="/images/plus.svg"
                    className="shadow-none !text-base"
                  >
                    Intéger Stripe
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabPanel>
      </div>
    </Layout>
  );
}