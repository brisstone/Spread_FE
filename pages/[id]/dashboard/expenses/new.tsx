import useSWR from "swr";
import { Form, FormikProvider } from "formik";
import Button, { AddButton } from "@/components/button";
import Card from "@/components/card";
import CurrenciesDropdown from "@/components/currency-dropdown";
import GlassRadioInput from "@/components/glass-radio-input";
import Input, { TextArea } from "@/components/input";
import Layout, { LayoutHeader } from "@/components/layout";
import { ExpenseType } from "@/types/enum";
import { number, object, string } from "yup";
import { RequiredSchema, UuidSchema, UuidSchemaMsg } from "@/util/schema";
import { usePost } from "@/hooks/apiHooks";
import { Expense, ExpenseCategory } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Fetched from "@/components/fetched";
import { Feedback } from "@/components/feedback";
import CreateCategoryModal from "@/components/expenses/create-category-modal";
import { useState } from "react";
import { useRouter } from "next/router";

const Schema = object({
  name: RequiredSchema(),
  description: string().optional(),
  type: RequiredSchema().oneOf(Object.values(ExpenseType)),
  date: string().optional(),
  currencyId: UuidSchema,
  categoryId: UuidSchemaMsg("Veuillez sélectionner une catégorie"),
  amount: number().required("Ceci est nécessaire"),
});

const initialValues = {
  name: "",
  description: undefined,
  type: ExpenseType.UNIQUE,
  date: undefined,
  currencyId: "",
  categoryId: "",
  amount: undefined,
};

export default function NewExpense() {
  const { pushAlert } = useAlert();

  const [modalOpen, setModalOpen] = useState(false);
  const {asPath, push} = useRouter();

  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useSWR<ExpenseCategory[]>("/expenses/categories");

  const { formik } = usePost<Expense, typeof initialValues>({
    url: "/expenses",
    initialValues,
    schema: Schema,
    onComplete: (data) => {
      push(`${asPath.substring(0, asPath.lastIndexOf("/"))}/list`)
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

  return (
    <Layout>
      <CreateCategoryModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Card className="flex flex-col w-full h-full grow p-7">
            <div className="flex">
              <div>
                <div className="flex">
                  <div className="min-w-[362px]">
                    <h2 className="text-3xl">Type</h2>

                    <GlassRadioInput
                      containerClassName="mt-5"
                      id="unique"
                      labelText="Dépense Unique"
                      value={ExpenseType.UNIQUE}
                      checked={values.type === ExpenseType.UNIQUE}
                      onChange={(e) =>
                        setFieldValue("type", (e.target as any).value)
                      }
                    />
                    <GlassRadioInput
                      containerClassName="mt-5"
                      id="monthly"
                      labelText="Dépense Mensuelle"
                      value={ExpenseType.MONTHLY}
                      checked={values.type === ExpenseType.MONTHLY}
                      onChange={(e) =>
                        setFieldValue("type", (e.target as any).value)
                      }
                    />
                    <GlassRadioInput
                      containerClassName="mt-5"
                      id="annual"
                      labelText="Dépense Annuelle"
                      value={ExpenseType.ANNUAL}
                      checked={values.type === ExpenseType.ANNUAL}
                      onChange={(e) =>
                        setFieldValue("type", (e.target as any).value)
                      }
                    />
                  </div>
                  <div className="ml-8">
                    <h2 className="text-3xl">Devise & Date</h2>
                    <div className="">
                      <CurrenciesDropdown
                        className="mt-5"
                        errorText={touched.currencyId && errors.currencyId}
                        {...getFieldProps("currencyId")}
                      />
                      <Input
                        placeholder="Date limite"
                        className="mt-5"
                        smallerYPadding
                        type="date"
                        errorText={touched.date && errors.date}
                        // {...getFieldProps("dueDate")}
                        onChange={(e) => {
                          console.log((e.target as any).value);
                          setFieldValue(
                            "date",
                            new Date((e.target as any).value).toISOString()
                          );
                        }}
                      />
                      <Input
                        placeholder="Montant"
                        className="mt-5"
                        smallerYPadding
                        type="number"
                        {...getFieldProps("amount")}
                        errorText={touched.amount && errors.amount}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-3xl">Détails</h2>
                  <Input
                    placeholder="Nom"
                    className="mt-5"
                    smallerYPadding
                    {...getFieldProps("name")}
                    errorText={touched.name && errors.name}
                  />
                  <TextArea
                    placeholder="Details (Optionnel)"
                    className="mt-5 !h-[233px]"
                    {...getFieldProps("description")}
                    errorText={touched.description && errors.description}
                  />
                </div>
              </div>

              <div className="min-w-[362px] ml-8">
                <h2 className="text-3xl">Catégorie(s)</h2>

                <Fetched
                  error={catError}
                  isLoading={catLoading}
                  data={categories}
                  feedbackNoAbsolute
                  feedbackClassName="!text-left mt-5"
                  dataComp={(d) => (
                    <>
                      {d.length > 0 ? (
                        d.map((c) => (
                          <GlassRadioInput
                            key={c.id}
                            containerClassName="mt-5"
                            id={c.id}
                            labelText={c.name}
                            value={c.id}
                            checked={values.categoryId === c.id}
                            onChange={(e) =>
                              setFieldValue(
                                "categoryId",
                                (e.target as any).value
                              )
                            }
                          />
                        ))
                      ) : (
                        <Feedback
                          className="!text-left mt-5"
                          noAbsolute
                          msg="Vous n'avez pas encore créé de catégorie"
                        />
                      )}

                      {touched.categoryId && errors.categoryId && (
                        <span className="text-xs text-red-400 break-words max-w-full mt-2">
                          {errors.categoryId}
                        </span>
                      )}
                      <AddButton
                        type="button"
                        text="Ajouter une catégorie"
                        className="mt-5"
                        onClick={() => setModalOpen(true)}
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="mt-5">
              <Button type="submit" loading={isSubmitting}>
                Enregistrer
              </Button>
            </div>
          </Card>
        </Form>
      </FormikProvider>
    </Layout>
  );
}
