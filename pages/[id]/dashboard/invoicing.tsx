import Button from "@/components/button";
import Card, { CardContent, CardHeader } from "@/components/card";
import Input, { TextArea } from "@/components/input";
import CreateInvoice from "@/components/invoicing/create-invoice";
import { InvoiceList } from "@/components/invoicing/invoice-list";
import InvoiceReportList from "@/components/invoicing/invoice-report-list";
import KPI from "@/components/kpi";
import Layout from "@/components/layout";
import Select, { SelectOption } from "@/components/select";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import { AlertType, InvoiceType } from "@/types/enum";
import { AreaChart } from "@tremor/react";
import { useEffect, useState } from "react";
import { KPIGroup } from ".";
import SalesTurnoverChart from "@/components/analytics/sales-turnover";
import { Form, FormikProvider } from "formik";
import { useAlert } from "@/contexts/alert-context";
import { usePost } from "@/hooks/apiHooks";
import { number, object, string } from "yup";
import useSWR, { mutate } from "swr";
import { DefaultBillingSettings } from "@/types/general";
import SalesTurnoverChart2 from "@/components/analytics/sales-turnover-2";

const Schema = object({
  currency: string().optional(),
  tax: number().optional(),
  discount: number().optional(),
  amount: number().optional(),
  title: string().optional(),
  description: string().optional(),

});


export default function Invoicing() {
  const [tabIndex, setTabIndex] = useState(0);
  const { pushAlert } = useAlert();



  // const {
  //   data: billingSettings,
  //   isLoading: invLoading,
  //   error: invError,
  // } = useSWR(() =>
  //   `/billing/settings`
  // );

  

  const {  data: billingSettings,
    isLoading: invLoading,
    error: invError,} = useSWR<DefaultBillingSettings[]>(
      `/billing/settings`
  );


  useEffect(() => {
    setFieldValue("discount",billingSettings?.[0]?.discount )
    setFieldValue("tax",billingSettings?.[0]?.tax )
    setFieldValue("currency",billingSettings?.[0]?.currency )
    setFieldValue("title",billingSettings?.[0]?.title )
    setFieldValue("description",billingSettings?.[0]?.description )
  }, [billingSettings?.[0]])


  

  const initialValues = {
    // @ts-ignore
    currency: billingSettings && billingSettings![0]?.currency,
    // @ts-ignore
    tax: billingSettings && billingSettings![0]?.tax,
    discount: billingSettings && billingSettings![0]?.tax,
    amount: billingSettings && billingSettings![0]?.amount,
    title: "",
    description: "",
  };
 
  const { data, error, formik } = usePost<
    {
      currency: string;
      tax: number;
      discount: number;
      amount: number;
      title: string;
      description: string;
    },
    typeof initialValues
  >({
    url: "/billing/settings",
    initialValues,
    schema: Schema,
    // modifyBefore: (values) => {
  
    //   values["referralCode"] = id
      

    //   return omit(values, ["confirmPassword"]);
    // },
    onComplete: (data) => {
      mutate(
        (key) => typeof key === "string" && key.startsWith("/billing/settings"),
        undefined,
        { revalidate: true }
      );
      console.log(data, "datadata");

      pushAlert(`Successful`, AlertType.SUCCESS);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

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
            <CreateInvoice onCreate={() => setTabIndex(1)} />
          </Card>
        </TabPanel>

        <TabPanel index={1} value={tabIndex}>
          <Card className="mt-7 relative flex flex-col grow h-full">
            <InvoiceList type={InvoiceType.SIMPLE} />
          </Card>
        </TabPanel>

        <TabPanel index={2} value={tabIndex}>
          <Card className="mt-7 relative flex flex-col grow h-full">
            <InvoiceList type={InvoiceType.RECURRENT} />
          </Card>
        </TabPanel>
        <TabPanel index={3} value={tabIndex}>
          <div className="w-full mt-6">
            <KPIGroup />

            <SalesTurnoverChart2 className="w-full mt-5" />
          </div>
        </TabPanel>

        <TabPanel index={4} value={tabIndex}>
          <Card className="mt-7 relative flex flex-col grow h-full">
            <InvoiceReportList />
          </Card>
        </TabPanel>

        <TabPanel index={5} value={tabIndex}>
          <Card className="mt-7 relative flex flex-col grow h-full px-6 py-14">
            <div className="w-full p-7">
              <h3 className="text-[22px] leading-[26px]">
                Paramètres de facturation par défaut
              </h3>
              <FormikProvider value={formik}>
             
              <Form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="w-full"
              >
                <div className="mt-10">
                  <div className="flex gap-4 items-center">
                    <Input
                      header="Titre de la facture"
                      placeholder="Invoice From"
                      smallerYPadding
                      {...getFieldProps(`title`)}
                      errorText={touched.title && errors.title}
                    />
                    {/* <Input
                      header="descriptif"
                      placeholder="descriptif"
                      type="number"
                      smallerYPadding
                      {...getFieldProps(`description`)}
                    /> */}
                    <Select header="Devise" {...getFieldProps(`currency`)}  errorText={touched.currency && errors.currency}>
                      <SelectOption value="USD">USD</SelectOption>
                      <SelectOption value="EURO">EURO</SelectOption>
                    </Select>
                  </div>

                  <div className="flex gap-4 items-center mt-3">
                    {/* <Input
                      header="Titre de la facture"
                      placeholder="Invoice From"
                      smallerYPadding
                      {...getFieldProps(`amount`)}
                    /> */}
                    <Input
                      header="Numéro de facture"
                      placeholder="1001"
                      type="number"
                      smallerYPadding
                      {...getFieldProps(`tax`)}
                      errorText={touched.tax && errors.tax}
                    />
                    <Input
                      header="TVA"
                      className="max-w-[95px]"
                      placeholder="%"
                      type="number"
                      smallerYPadding
                      {...getFieldProps(`discount`)}
                      errorText={touched.discount && errors.discount}
                    />
                  </div>

                  {/* <TextArea
                  header={
                    <>
                      <span>Détails de facturation </span>
                      <span className="text-icon">(Max 250 mots: 0/250)</span>
                    </>
                  }
                  placeholder="Vos détails de facturation ... (optionnel)"
                  className="mt-5 max-w-[75%]"
                /> */}

                  <TextArea
                    header={
                      <>
                        <span>Notes de facturation </span>
                        <span className="text-icon">(Max 250 mots: 0/250)</span>
                      </>
                    }
                    placeholder="Vos détails de facturation ... (optionnel)"
                    className="mt-5 max-w-[75%]"
                    {...getFieldProps(`description`)}
                    errorText={touched.description && errors.description}
                  />

                  <div className="mt-10 flex gap-6">
                    {/* <Button
                    // loading={}
                    type="submit"
                    iconUrl="/images/plus-black.svg"
                    className="shadow-none !text-base bg-white text-black"
                  >
                    Créer
                  </Button> */}
                    <Button
                      // loading={}
                      loading={isSubmitting}
                      type="submit"
                      iconUrl="/images/plus.svg"
                      className="shadow-none !text-base"
                    >
                      Intéger Stripe
                    </Button>
                  </div>
                </div>
              </Form>
              </FormikProvider>
            </div>
          </Card>
        </TabPanel>
      </div>
    </Layout>
  );
}
