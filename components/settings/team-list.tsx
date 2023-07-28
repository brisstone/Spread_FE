import useSWR from "swr";
import Image from "next/image";
import { AlertType, EnterpriseRole, roleMap } from "@/types/enum";
import { UserDetail } from "@/types/general";
import Fetched from "../fetched";
import { Feedback } from "../feedback";
import { getUserName } from "@/lib/util";
import { useMemo, useState } from "react";
import { deleteUsers } from "@/services";
import { useAlert } from "@/contexts/alert-context";
import { ConfirmationModal } from "../modal";

interface UserTableRowProps {
  name: string;
  email: string;
  role: EnterpriseRole;
  profileImageUrl: string | null;
  checked: boolean;
  onCheck: () => any;
  onDelete: () => any;
}

function UserTableRow(props: UserTableRowProps) {
  return (
    <tr className="border-b border-solid border-divider">
      <td className="py-3 text-center">
        <input
          type="checkbox"
          id="logo-facture"
          className="mt-[3px]"
          checked={props.checked}
          onChange={props.onCheck}
        />
      </td>
      <td className="py-3">
        <div className="flex gap-3 items-center cursor-pointer">
          <div className="flex relative">
            <Image
              src={props.profileImageUrl || "/images/profilecompany2.png"}
              height={40}
              width={40}
              alt="avatar"
              className="rounded-full object-cover w-10 h-10"
            />
          </div>
          <div className="grow">
            <p className="text-base">{props.name}</p>
            <p className="text-base text-obsec">{props.email}</p>
          </div>
        </div>
      </td>
      <td className="text-obsec text-base">{roleMap[props.role]}</td>
      <td className="text-obsec text-base text-center">
        <span className="inline-flex gap-3">
          <span className="cursor-pointer" onClick={props.onDelete}>
            Delete
          </span>
          <span className="text-[#6941C6]">Edit</span>
        </span>
      </td>
    </tr>
  );
}

export default function TeamList() {
  const { data, isLoading, error, mutate } =
    useSWR<UserDetail[]>("/enterprise/users");

  const [checked, setChecked] = useState<string[]>([]);

  const { pushAlert } = useAlert();

  const allChecked = useMemo(
    () =>
      data && data.length > 0
        ? data.every((d) => checked.includes(d.id))
        : false,
    [checked, data]
  );

  const [toDelete, setToDelete] = useState<string | null>(null);

  return (
    <Fetched
      error={error}
      isLoading={isLoading}
      data={data}
      dataComp={(usrs) =>
        usrs.length > 0 ? (
          <>
            <ConfirmationModal
              text="Voulez-vous vraiment supprimer cet utilisateur ?"
              open={!!toDelete}
              onCancel={() => setToDelete(null)}
              onConfirm={() => {
                if (!toDelete) return;
                deleteUsers([toDelete])
                  .then(() => {
                    setToDelete(null);
                    mutate((prev) => prev?.filter((p) => p.id !== toDelete));
                    pushAlert("Utilisateur supprimé", AlertType.SUCCESS);
                  })
                  .catch((e) => {
                    setToDelete(null);
                    pushAlert("Impossible de supprimer l'utilisateur");
                  });
              }}
            />
            <table className="table-auto w-full">
              <thead>
                <tr className="border-b border-solid border-divider">
                  <th className="py-3 w-fit text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      id="logo-facture"
                      className="mt-[3px]"
                      checked={allChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setChecked(usrs.map((u) => u.id));
                        } else {
                          setChecked([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-xs text-obsec font-normal text-left py-3 w-[60%]">
                    Nom
                  </th>
                  <th className="text-left text-xs text-obsec font-normal py-3">
                    <span className="inline-flex gap-1">
                      <span>Role</span>
                      <Image
                        src="/images/question-more.svg"
                        height={13.33}
                        width={13.33}
                        alt="Question icon"
                        className=""
                      />
                    </span>
                  </th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {usrs.map((u) => (
                  <UserTableRow
                    key={u.id}
                    name={getUserName(u)}
                    email={u?.baseUser?.email}
                    role={u.enterpriseRole.name}
                    profileImageUrl={u.profileImageUrl}
                    checked={checked.includes(u.id)}
                    onDelete={() => {
                      setToDelete(u.id);
                    }}
                    onCheck={() => {
                      setChecked((prev) => {
                        if (prev.includes(u.id)) {
                          return prev.filter((id) => id !== u.id);
                        } else {
                          return [...prev, u.id];
                        }
                      });
                    }}
                  />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-base text-subtitle">Vous n&apos;avez pas encore ajouté de membres à l&apos;équipe</p>
        )
      }
    />
  );
}
