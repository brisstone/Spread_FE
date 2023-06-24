import Image from "next/image";
import { Props } from "@/types/props";
import Input, { TextArea } from "../input";
import { Section, SettingsTop } from "./util";
import useSWR from "swr";
import Cookies from "js-cookie";
import { Enterprise } from "@/types/general";
import Button from "../button";
import { array, boolean, object, string } from "yup";
import { usePost } from "@/hooks/apiHooks";
import { useAlert } from "@/contexts/alert-context";
import Fetched from "../fetched";
import { FieldArray, Form, FormikProvider } from "formik";
import { useState } from "react";
import IconButton from "../iconbutton";
import { AlertType } from "@/types/enum";
import DragDropFile from "../drag-drop-file";

const Schema = object({
  name: string().optional(),
  description: string().optional(),
  includeLogoInEmail: boolean().optional(),
  includeLogoInInvoice: boolean().optional(),
  socials: array()
    .of(
      string()
        .url("Vous devez entrer une URL valide")
        .required("Vous devez entrer une URL valide")
    )
    .optional(),
});

export default function EnterpriseSettings() {
  const {
    data: enterprise,
    isLoading,
    error,
    mutate,
  } = useSWR<Enterprise>("/enterprise");
  const { pushAlert } = useAlert();

  const initialValues = {
    name: enterprise?.name,
    description: enterprise?.description || "",
    includeLogoInEmail: enterprise?.includeLogoInEmail,
    includeLogoInInvoice: enterprise?.includeLogoInInvoice,
    socials: enterprise?.socials,
    // categoryId: props.categoryId,
  };

  const [disabled, setDisabled] = useState(true);

  const [image, setImage] = useState("");

  const { formik } = usePost<Enterprise, typeof initialValues>({
    url: "/enterprise",
    type: "patch",
    enableReinitialize: true,
    initialValues,
    schema: Schema,
    onComplete: (data) => {
      mutate(data);
      pushAlert("Données d'entreprise mises à jour", AlertType.SUCCESS);
      setDisabled(true);
    },
    onError: (e) => {
      console.log("submit error");
      pushAlert(e.message);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  console.log(values, errors);

  function reader(file: any, callback: any) {
    const fr = new FileReader();
    fr.onload = () => callback(null, fr.result);
    fr.onerror = (err) => callback(err);
    fr.readAsDataURL(file);
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <SettingsTop
          header="Informations d’entreprise"
          subtitle="Actualisez vos informations d’entreprise."
        >
          <Button
            type="button"
            className="!text-base bg-white !text-black"
            onClick={(e) => {
              if (disabled) {
                setDisabled(false);
              } else {
                formik.resetForm();
                setDisabled(true);
              }
            }}
          >
            {disabled ? "Modifier" : "Annuler"}
          </Button>
          {!disabled && (
            <Button className="!text-base" type="submit" loading={isSubmitting}>
              Mise à jour
            </Button>
          )}
        </SettingsTop>

        <div className="relative mt-11">
          <Fetched
            error={error}
            isLoading={isLoading}
            data={enterprise}
            dataComp={(data) => (
              <>
                <Section
                  header="Profile Public"
                  subtitle="Informations visibles par tous."
                >
                  <Input
                    placeholder="Nom de l’entreprise"
                    className="grow"
                    smallerYPadding
                    disabled={disabled}
                    {...getFieldProps(`name`)}
                    errorText={touched.name && errors.name}
                    // inputClassName="placeholder:text-white"
                  />
                  <Input
                    placeholder="URL"
                    disabled
                    value="stread.io/enterprise"
                    className="grow mt-4"
                    smallerYPadding
                  />
                </Section>
                <Section
                  header="Description"
                  subtitle="Description rapide de votre entreprise."
                  className="mt-7"
                >
                  <TextArea
                    disabled={disabled}
                    placeholder="Details (Optionnel)"
                    className="grow"
                    {...getFieldProps("description")}
                    errorText={touched.description && errors.description}
                  />
                </Section>
                <Section
                  header="Logo"
                  subtitle="Téléchargez votre Logo."
                  className="mt-7"
                >
                  <div className="flex items-stretch">
                    {image == "" ? (
                      ""
                    ) : (
                      <Image
                        src={image}
                        height={111}
                        width={111}
                        alt="Logo"
                        className="w-[111px] h-[111px]"
                      />
                    )}
                    <DragDropFile
                      onFile={(file) => {
                        console.log("FILE", file);
                        reader(file, (err: any, res: any) => {
                          setImage(res);
                        });
                      }}
                      id="enterprise-img"
                      className="grow ml-10"
                    />
                  </div>
                </Section>

                <Section
                  header="Image de Marque"
                  subtitle="Ajoutez votre logo dans vos factures et emails."
                  className="mt-7"
                >
                  <div className="flex items-center h-full">
                    <label htmlFor="facture" className="flex items-start gap-2">
                      <input
                        disabled={disabled}
                        type="checkbox"
                        id="logo-facture"
                        className="mt-[3px]"
                        {...getFieldProps("includeLogoInEmail")}
                        checked={values.includeLogoInEmail}
                        // errorText={touched.description && errors.description}
                      />
                      <div className="">
                        <p className="text-base leading-5">Facture</p>
                        <p className="text-base leading-5 text-dim-white2">
                          Inclure le logo dans les factures.
                        </p>
                      </div>
                    </label>
                    <label
                      htmlFor="logo-email"
                      className="flex items-start gap-2 ml-8"
                    >
                      <input
                        disabled={disabled}
                        type="checkbox"
                        id="logo-email"
                        className="mt-[3px]"
                        {...getFieldProps("includeLogoInInvoice")}
                        checked={values.includeLogoInInvoice}
                      />
                      <div className="">
                        <p className="text-base leading-5">Facture</p>
                        <p className="text-base leading-5 text-dim-white2">
                          Inclure le logo dans les factures.
                        </p>
                      </div>
                    </label>
                  </div>
                </Section>

                <Section
                  header="Réseaux Sociaux"
                  subtitle="Réseaux Sociaux"
                  className="mt-7"
                >
                  <FieldArray
                    name="socials"
                    render={(arrayHelpers) => (
                      <>
                        {values.socials && values.socials.length > 0 ? (
                          <div className="relative grid grid-cols-2 gap-x-7 gap-y-7">
                            {values.socials.map((s, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Input
                                  className="grow"
                                  disabled={disabled}
                                  placeholder="URL"
                                  {...getFieldProps(`socials[${index}]`)}
                                  errorText={
                                    touched.socials &&
                                    errors.socials &&
                                    errors.socials[index]
                                  }
                                  smallerYPadding
                                />
                                <IconButton
                                  disabled={disabled}
                                  type="button"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                  }}
                                  iconUrl="/images/bin.svg"
                                  height={14}
                                  width={14}
                                  // TODO edge not working, fix
                                  // edge="left"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-base text-subtitle">
                            Vous n&apos;avez pas encore ajouté de liens sociaux
                          </p>
                        )}
                        <Button
                          type="button"
                          disabled={disabled}
                          className="!text-base bg-white !text-black mt-5"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Ajouter
                        </Button>
                      </>
                    )}
                  />
                </Section>
              </>
            )}
          />
        </div>
      </Form>
    </FormikProvider>
  );
}
