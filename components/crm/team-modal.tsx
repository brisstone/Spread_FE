import { array, number, object, string } from "yup";
import useSWR, { useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { CRMLead, LeadOnboarding, MinimalUser } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";
import PhoneInput from "react-phone-input-2";
import utilStyles from "@/styles/utils.module.css";
import "react-phone-input-2/lib/style.css";
import Select, { SelectOption } from "../select";
import { ScrollableList } from "../list";
import Fetched from "../fetched";
import Image from "next/image";
import { getUserName } from "@/lib/util";
import { Feedback } from "../feedback";

const LeadSchema = object({
  team: array().of(UuidSchema),
  leadId: string().optional(),
});

export default function ClientTeamModal(
  props: ModalProps & {
    lead: string;
  }
) {
  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig();

  // console.log(props.lead, "ddkfkkfk");

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useSWR<MinimalUser[]>(`/enterprise/users`);

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    CRMLead,
    {
      team: string[];
      leadId: string;
    }
  >({
    url: "/crm/clients/team",
    enableReinitialize: true,
    initialValues: {
      // email: props?.lead?.email,
      // phoneNumber: props?.lead?.phoneNumber,
      // name: props.lead?.name,
      // amount: props.lead?.amount,
      // categoryId: props?.categoryId,
      // status: props?.lead?.status,
      team: [],
      leadId: props.lead ?? undefined,
      // currencyId: "",
    },
    schema: LeadSchema,
    onComplete: (data) => {
      // mutate(
      //   `/crm/leads?categoryId=${props.categoryId}`,
      //   (existing: CRMLead[] | undefined): CRMLead[] => {
      //     if (!existing) return [data];
      //     return [...existing, data];
      //   }
      // );
      if (props.handleClose) props.handleClose();
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  console.log(formError, "formErrorformError");

  const {
    errors,
    values,
    setFieldValue,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      <FormikProvider value={formik}>
        <Form className="w-full" onSubmit={handleSubmit}>
          <div className="text-[white] mb-6">Choisis une équipe</div>

          <div className="min-w-[20rem] min-h-[20rem] relative">
            <Fetched
              error={usersError}
              isLoading={usersLoading}
              data={users}
              dataComp={(usrs) =>
                usrs.length > 0 ? (
                  <ScrollableList className="w-full !h-80">
                    {usrs.map((u) => (
                      <li key={u.id} className="mb-4">
                        <label
                          htmlFor={u.id}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={values.team.includes(u.id)}
                            id={u.id}
                            onChange={() => {
                              if (values.team.includes(u.id)) {
                                setFieldValue(
                                  "team",
                                  values.team.filter((t) => t !== u.id)
                                );
                              } else {
                                setFieldValue("team", [...values.team, u.id]);
                              }
                            }}
                          />
                          <Image
                            src={
                              u.profileImageUrl || "/images/genericavatar.png"
                            }
                            height={30}
                            width={30}
                            alt="avatar"
                            className="rounded-full ml-3"
                          />
                          <p className="text-base ml-3">{`${getUserName(
                            u
                          )}`}</p>
                        </label>
                      </li>
                    ))}
                  </ScrollableList>
                ) : (
                  <Feedback msg=" Aucun utilisateur n'a le rôle d'opérateur" />
                )
              }
            />
          </div>

          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Ajouter
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
