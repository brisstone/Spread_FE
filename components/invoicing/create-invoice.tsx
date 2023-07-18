import { EnterpriseRole, InvoiceType } from "@/types/enum";
import Checkbox, { Radio } from "../checkbox";
import Glass from "../glass";
import Select, { SelectOption } from "../select";
import UsersDropdown from "../users-dropdown";
import Input, { TextArea } from "../input";
import Button, { AddButton } from "../button";
import { usePost } from "@/hooks/apiHooks";
import { DefaultBillingSettings, Invoice } from "@/types/general";
import { array, date, number, object, string } from "yup";
import { RequiredSchema, UuidSchema } from "@/util/schema";
import { useAlert } from "@/contexts/alert-context";
import { Field, FieldArray, Form, FormikProvider } from "formik";
import CurrenciesDropdown from "../currency-dropdown";
import ClientsDropdown from "../client-dropdown";
import IconButton from "../iconbutton";
import { arrayError } from "@/lib";
import { mutate, } from "swr";
import useSWR from 'swr'
import { useEffect } from "react";


const Schema = object({
  type: string().oneOf(Object.values(InvoiceType)),
  dueDate: string().optional(),
  currencyId: UuidSchema,
  clientId: UuidSchema,
  name: RequiredSchema(),
  description: string().optional(),
  notes: string().optional(),
  discount: string().optional(),
  tax: string().optional(),
  items: array()
    .of(
      object({
        description: RequiredSchema(),
        quantity: number()
          .min(1, "Cela devrait être au moins 1")
          .required("Ceci est nécessaire"),
        price: number().min(0).required("Ceci est nécessaire"),
      })
    )
    .min(1),
});

const itemDefault = {
  description: "",
  quantity: 0,
  price: 0,
};



export default function CreateInvoice(props: { onCreate: () => any }) {
  const { pushAlert } = useAlert();



  const {  data: billingSettings,
    isLoading: invLoading,
    error: invError,} = useSWR<DefaultBillingSettings []>(
      `/billing/settings`
  );

  useEffect(() => {
    setFieldValue("discount",billingSettings?.[0]?.discount )
    setFieldValue("tax",billingSettings?.[0]?.tax )
    setFieldValue("currencyId",billingSettings?.[0]?.currency )
    setFieldValue("name",billingSettings?.[0]?.title )
    setFieldValue("description",billingSettings?.[0]?.description )
  }, [billingSettings?.[0]])
  
  const initialValues = {
    type: InvoiceType.SIMPLE,
    dueDate: undefined,
    currencyId: "",
    clientId: "",
    name: "",
    description: "",
    notes: "",
    discount: billingSettings?.[0].discount,
    tax: undefined,
    items: [itemDefault],
  };
  const { formik } = usePost<Invoice, typeof initialValues>({
    url: "/invoices",
    initialValues,
    schema: Schema,
    onComplete: (data) => {
      mutate(
        (key) => typeof key === "string" && key.startsWith("/invoices"),
        undefined,
        { revalidate: true }
      );
      props.onCreate();
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });


  




  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  console.log("values:", values);

  return (
    <FormikProvider value={formik}>
      <div className="w-full h-full grow p-7">
        <Form onSubmit={handleSubmit}>
          <div className="flex">
            <div>
              <p className="text-3xl">Type</p>
              <div className="mt-5 min-w-[362px]">
                <label htmlFor="simple" className="cursor-pointer">
                  <Glass className="flex items-center py-3 px-6">
                    <Radio
                      id="simple"
                      name="type"
                      value={InvoiceType.SIMPLE}
                      checked={values.type === InvoiceType.SIMPLE}
                      onChange={(e) =>
                        setFieldValue("type", (e.target as any).value)
                      }
                    />
                    <p className="text-base ml-3">Facture Simple</p>
                  </Glass>
                </label>
                <label htmlFor="recurrent" className="cursor-pointer">
                  <Glass className="flex items-center py-3 px-6 min-w-[362px] mt-5">
                    <Radio
                      id="recurrent"
                      name="type"
                      value={InvoiceType.RECURRENT}
                      checked={values.type === InvoiceType.RECURRENT}
                      onChange={(e) =>
                        setFieldValue("type", (e.target as any).value)
                      }
                    />
                    <p className="text-base ml-3">Facture Récurrente</p>
                  </Glass>
                </label>
              </div>
            </div>

            <div className="ml-[78px]">
              <p className="text-3xl">Devise</p>
              <div className="mt-5">
                <CurrenciesDropdown
                  errorText={touched.currencyId && errors.currencyId}
                  {...getFieldProps("currencyId")}
                />
                <Input
                  header="Date limite"
                  placeholder="Date limite"
                  className="mt-5"
                  smallerYPadding
                  type="date"
                  errorText={touched.dueDate && errors.dueDate}
                  // {...getFieldProps("dueDate")}
                  onChange={(e) => {
                    console.log((e.target as any).value);
                    try {
                      setFieldValue(
                        "dueDate",
                        new Date((e.target as any).value).toISOString()
                      );
                    } catch (e) {
                      setFieldValue("dueDate", undefined);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex mt-11">
            <div>
              <p className="text-3xl">Client</p>
              <div className="mt-5 min-w-[362px]">
                <ClientsDropdown
                  errorText={touched.clientId && errors.clientId}
                  {...getFieldProps("clientId")}
                />
              </div>
            </div>

            <div className="ml-[78px]">
              <p className="text-3xl">Facture</p>
              <div className="mt-5 min-w-[474px]">
                <Input
                  placeholder="Facture de"
                  className="mt-2"
                  smallerYPadding
                  {...getFieldProps("name")}
                  errorText={touched.name && errors.name}
                />
                <TextArea
                  placeholder="Details (Optionnel)"
                  className="mt-5"
                  {...getFieldProps("description")}
                  errorText={touched.description && errors.description}
                />
              </div>
            </div>
          </div>

          <div className="mt-11">
            <p className="text-3xl">Détails - Facture</p>
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <>
                  {values.items &&
                    values.items.map((item, index) => (
                      <div className="flex items-end mt-6" key={index}>
                        <Input
                          header="Description du service"
                          placeholder="Description du service"
                          className="min-w-[359px]"
                          smallerYPadding
                          {...getFieldProps(`items[${index}].description`)}
                          errorText={
                            touched.items &&
                            touched.items[index] &&
                            touched.items[index].description &&
                            arrayError(errors.items, index, "description")
                          }
                        />
                        <div className="flex items-end gap-6 ml-[78px]">
                          <Input
                            header="Quantité"
                            placeholder="Quantité"
                            className="max-w-[118px]"
                            type="number"
                            smallerYPadding
                            {...getFieldProps(`items[${index}].quantity`)}
                            errorText={
                              touched.items &&
                              touched.items[index] &&
                              touched.items[index].quantity &&
                              arrayError(errors.items, index, "quantity")
                            }
                          />
                          <Input
                            header="Prix"
                            placeholder="Prix"
                            type="number"
                            className="max-w-[118px]"
                            smallerYPadding
                            {...getFieldProps(`items[${index}].price`)}
                            errorText={
                              touched.items &&
                              touched.items[index] &&
                              touched.items[index].price &&
                              arrayError(errors.items, index, "price")
                            }
                          />
                          <Input
                            header="Total"
                            placeholder="Total"
                            className="max-w-[118px]"
                            type="numberS"
                            smallerYPadding
                            disabled
                            value={item.price * item.quantity}
                          />
                          {index !== 0 && (
                            <IconButton
                              width={15}
                              height={15}
                              iconUrl="/images/cancel.svg"
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  <AddButton
                    text="Ajouter un élément"
                    className="mt-5"
                    onClick={() => {
                      arrayHelpers.push(itemDefault);
                    }}
                  />
                </>
              )}
            />
          </div>

          <div className="mt-11">
            <p className="text-3xl">Notes</p>
            <div className="flex items-center mt-6">
              <Input
                placeholder="Détails (Optionnel)"
                className="min-w-[359px]"
                smallerYPadding
                {...getFieldProps("notes")}
              />
              <div className="flex gap-6 ml-[78px]">
                <Input
                  placeholder="Réduction"
                  className="max-w-[118px]"
                  type="number"
                  smallerYPadding
                  {...getFieldProps("discount")}
                />
                <Input
                  placeholder="Taxes"
                  className="max-w-[118px]"
                  type="number"
                  smallerYPadding
                  {...getFieldProps("tax")}
                />
              </div>
            </div>
          </div>

          <Button
            loading={isSubmitting}
            type="submit"
            iconUrl="/images/plus.svg"
            className="shadow-none !text-base mt-7"
          >
            Créer
          </Button>
        </Form>
      </div>
    </FormikProvider>
  );
}
