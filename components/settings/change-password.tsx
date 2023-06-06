import { Form, FormikProvider } from "formik";
import { object, ref, string } from "yup";
import { usePost } from "@/hooks/apiHooks";
import { useAlert } from "@/contexts/alert-context";
import { AlertType } from "@/types/enum";
import { PasswordSchema, RequiredSchema } from "@/util/schema";
import Button from "../button";
import Input from "../input";
import { SettingsTop } from "./util";
import { omit } from "lodash";

const Schema = object({
  currentPassword: RequiredSchema(),
  newPassword: PasswordSchema,
  confirmPassword: PasswordSchema.oneOf(
    [ref("newPassword")],
    "Cela devrait correspondre à votre nouveau mot de passe"
  ),
});

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const { pushAlert } = useAlert();

  const { formik } = usePost<null, typeof initialValues>({
    url: "/auth/user/password",
    enableReinitialize: true,
    initialValues,
    type: "patch",
    schema: Schema,
    modifyBefore: (data) => {
      return omit(data, ['confirmPassword'])
    },
    onComplete: (data) => {
      pushAlert("Mot de passe changé", AlertType.SUCCESS);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        {" "}
        <SettingsTop
          header="Mot de Passe"
          subtitle="Modifiez votre mot de passe"
        />
        <div className="mt-11 lg:max-w-[75%]">
          <div className="flex w-full items-center gap-11">
            <p className="text-base w-[20%] max-w-[20%]">Mot de passe actuel</p>
            <Input
              header=""
              smallerYPadding
              className="grow"
              type="password"
              {...getFieldProps("currentPassword")}
              errorText={touched.currentPassword && errors.currentPassword}
              // inputClassName="placeholder:text-white"
            />
          </div>
          <div className="flex mt-6 w-full items-center gap-11">
            <p className="text-base w-[20%] max-w-[20%]">
              Nouveau mot de passe
            </p>
            <Input
              header=""
              smallerYPadding
              className="grow"
              type="password"
              {...getFieldProps("newPassword")}
              errorText={touched.newPassword && errors.newPassword}
              // inputClassName="placeholder:text-white"
            />
          </div>
          <div className="flex mt-6 w-full items-center gap-11">
            <p className="text-base w-[20%] max-w-[20%]">
              Confirmer le mot de passe
            </p>
            <Input
              header=""
              smallerYPadding
              className="grow"
              type="password"
              {...getFieldProps("confirmPassword")}
              errorText={touched.confirmPassword && errors.confirmPassword}
              // inputClassName="placeholder:text-white"
            />
          </div>
        </div>
        <Button
          loading={isSubmitting}
          type="submit"
          className="!text-base mt-6 w-fit"
        >
          Soumettre
        </Button>
      </Form>
    </FormikProvider>
  );
}
