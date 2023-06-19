import useSWR from "swr";
import { omit } from "lodash";
import { getUserName } from "@/lib/util";
import Select, { SelectOption, SelectProps } from "./select";
import { MinimalUser } from "@/types/general";
import { EnterpriseRole } from "@/types/enum";
import Fetched from "./fetched";

const genQueryFromArr = (arr: any, name: string): string => {
  let str: string = "";

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      str += `?${name}=${arr[i]}`;
    } else {
      str += `&${name}=${arr[i]}`;
    }
  }

  return str;
};

export default function UsersDropdown(
  props: SelectProps & { roles: EnterpriseRole[] }
) {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useSWR<MinimalUser[]>(
    `/enterprise/users${genQueryFromArr(props.roles, "role")}`
  );

  return (
    <Select
      {...omit(props, ["role"])}
      // errorText={touched.team && errors.team}
    >
      <SelectOption value="">Séléctionner un membre</SelectOption>
      <Fetched
        error={usersError}
        errorComp={
          <SelectOption value="">
            Échec de la récupération des données
          </SelectOption>
        }
        isLoading={usersLoading}
        isLoadingComp={<SelectOption value="">Chargement...</SelectOption>}
        data={users}
        dataComp={(usrs) =>
          usrs.length > 0 ? (
            usrs.map((u) => (
              <SelectOption key={u.id} value={u.id}>
                {`${getUserName(u)}`}
              </SelectOption>
            ))
          ) : (
            <SelectOption value="">
              Aucun utilisateur n&apos;a le rôle d&apos;opérateur
            </SelectOption>
          )
        }
      />
    </Select>
  );
}
