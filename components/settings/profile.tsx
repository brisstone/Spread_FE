import PhoneInput from "react-phone-input-2";
import ClipLoader from "react-spinners/ClipLoader";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import Input from "../input";
import { SettingsTop } from "./util";
import Button from "../button";
import useUser from "@/data/use-user";
import { usePost } from "@/hooks/apiHooks";
import { User } from "@/types/general";
import { object, string } from "yup";
import { useAlert } from "@/contexts/alert-context";
import { AlertType, roleMap } from "@/types/enum";
import { useState } from "react";
import { Form, FormikProvider } from "formik";
import Fetched from "../fetched";

import utilStyles from "@/styles/utils.module.css";
import {
  getProfileImageUploadSignedUrl,
  updateUserProfile,
  uploadToS3,
} from "@/services";

const Schema = object({
  firstName: string().optional(),
  lastName: string().optional(),
  dob: string().optional(),
  country: string().optional(),
  phoneNumber: string().optional(),
  address: string().optional(),
  city: string().optional(),
  postalCode: string().optional(),
});

async function uploadProfileImage(file: File) {
  const { key, url } = await getProfileImageUploadSignedUrl();

  await uploadToS3(url, file);

  const d = await updateUserProfile({
    profileImageKey: key,
  });

  return d;
}

export default function ProfileSettings() {
  const { user, error, isLoading, mutate } = useUser();

  const { pushAlert } = useAlert();

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    dob: user?.dob,
    country: user?.country,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    city: user?.city,
    postalCode: user?.postalCode,
  };

  const [disabled, setDisabled] = useState(true);

  const { formik } = usePost<User, typeof initialValues>({
    url: "/auth/user",
    type: "patch",
    enableReinitialize: true,
    initialValues,
    schema: Schema,
    onComplete: (data) => {
      console.log(data);
      mutate(data);
      pushAlert("Données d'entreprise mises à jour", AlertType.SUCCESS);
      setDisabled(true);
    },
    // onComplete: (data) => {
    //   mutate(
    //     `/crm/categories/${props.categoryId}/leads`,
    //     (existing: CRMLead[] | undefined): CRMLead[] => {
    //       if (!existing) return [data];
    //       return [...existing, data];
    //     }
    //   );
    //   props.handleClose();
    // },
    onError: (e) => {
      console.log("submit error");
      pushAlert(e.message);
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const [uploading, setUploading] = useState(false);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <SettingsTop
          header="Informations Personnelles"
          subtitle="Actualiser vos informations du’personnelle."
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
        <div className="w-full">
          <Fetched
            error={error}
            isLoading={isLoading}
            data={user}
            dataComp={(data) => (
              <>
                <div className="flex mt-12 gap-14 lg:max-w-[75%]">
                  <div className="relative h-fit">
                    {!uploading ? (
                      <Image
                        src={
                          data.profileImageUrl || "/images/profilecompany2.png"
                        }
                        height={108}
                        width={108}
                        alt="avatar"
                        className="rounded-full w-[108px] h-[108px] object-cover"
                      />
                    ) : (
                      <ClipLoader
                        color="#fff"
                        loading={true}
                        cssOverride={{
                          display: "block",
                        }}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    )}

                    <label className="absolute -bottom-4 -right-7 cursor-pointer bg-btn w-10 h-10 flex justify-center items-center rounded-full">
                      <input
                        id="new-file"
                        disabled={uploading}
                        multiple
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          e.preventDefault();

                          const [file] = e.target.files ? e.target.files : [];

                          if (!file) return;

                          setUploading(true);
                          uploadProfileImage(file)
                            .then((data) => {
                              console.log("upload data", data);
                              mutate(data);
                              setUploading(false);
                              pushAlert(
                                "Image de profil mise à jour",
                                AlertType.SUCCESS
                              );
                            })
                            .catch(() => {
                              setUploading(false);
                              pushAlert(
                                "Quelque chose s'est mal passé",
                                AlertType.ERROR
                              );
                            });
                        }}
                      />
                      <Image
                        src="/images/edit.svg"
                        height={12}
                        width={12}
                        alt="edit icon"
                      />
                    </label>
                  </div>
                  <div className="grow">
                    <div className="grid grid-cols-2 gap-5">
                      <Input
                        header="Prénom"
                        placeholder="Prénom"
                        disabled={disabled}
                        className="grow"
                        smallerYPadding
                        {...getFieldProps("firstName")}
                      />
                      <Input
                        disabled={disabled}
                        header="Nom"
                        placeholder="Nom"
                        smallerYPadding
                        {...getFieldProps("lastName")}
                        // inputClassName="placeholder:text-white"
                      />
                      <Input
                        disabled={disabled}
                        header="Nom d’utilisateur"
                        placeholder="Nom d’utilisateur"
                        value="Nom d’utilisateur"
                        smallerYPadding
                        // inputClassName="placeholder:text-white"
                      />

                      <Input
                        disabled
                        header="Email"
                        placeholder="Email"
                        defaultValue={data.email}
                        smallerYPadding
                        // inputClassName="placeholder:text-white"
                      />
                    </div>

                    <div className="grid mt-16 grid-cols-2 gap-5">
                      <Input
                        disabled
                        header="Autres Informations"
                        placeholder="Position"
                        value={roleMap[data.enterpriseRole.name]}
                        className="grow"
                        smallerYPadding
                      />
                      <Input
                        disabled={disabled}
                        header="Date de Naissance"
                        placeholder="Date de Naissance"
                        smallerYPadding
                        type="date"
                        // value={values.dob ? new Date(values.dob).toDateString() : undefined}
                        // {...getFieldProps("dueDate")}
                        onChange={(e) => {
                          console.log((e.target as any).value);
                          setFieldValue(
                            "dob",
                            new Date((e.target as any).value).toISOString()
                          );
                        }}
                      />
                      <PhoneInput
                        disabled={disabled}
                        country="fr"
                        containerClass={`${utilStyles.glass} grow !z-[1]`}
                        inputClass="!w-full py-[10px] !h-full !bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base !outline-none !border-none"
                        dropdownClass="!bg-[#1c1025] !z-50"
                        buttonClass="!bg-transparent !border-none hover:bg-btn"
                        // className="bg-transparent text-base px-5 py-[10px] placeholder:text-subtitle placeholder:text-base outline-none"
                        placeholder="Enter phone number"
                        value={values.phoneNumber}
                        onChange={(v) => setFieldValue("phoneNumber", `+${v}`)}
                      />

                      <Input
                        disabled={disabled}
                        placeholder="Adresse"
                        className="grow"
                        smallerYPadding
                        {...getFieldProps("address")}
                      />
                      <Input
                        disabled={disabled}
                        placeholder="Ville"
                        className="grow"
                        smallerYPadding
                        {...getFieldProps("city")}
                      />
                      <Input
                        disabled={disabled}
                        placeholder="Pays"
                        className="grow"
                        smallerYPadding
                        {...getFieldProps("country")}
                      />
                      <Input
                        disabled={disabled}
                        placeholder="Code Postal"
                        className="grow"
                        smallerYPadding
                        {...getFieldProps("postalCode")}
                      />
                    </div>
                  </div>
                </div>
                <Button className="bg-dim-white3 w-fit !text-black mt-14">
                  Déconnexion
                </Button>
              </>
            )}
          />
        </div>
      </Form>
    </FormikProvider>
  );
}
