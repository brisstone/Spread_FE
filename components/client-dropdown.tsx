import useSWR from "swr";
import Select, { SelectOption, SelectProps } from "./select";
import { Client } from "@/types/general";
import Fetched from "./fetched";

export default function ClientsDropdown(
  props: SelectProps & { defaultLabel?: string }
) {
  const {
    data: clients,
    isLoading: clientsLoading,
    error: clientsError,
  } = useSWR<Client[]>("/crm/clients");

  return (
    <Select
      {...props}
      // errorText={touched.team && errors.team}
    >
      <SelectOption value="">
        {props.defaultLabel || "Séléctionner un client"}
      </SelectOption>
      <Fetched
        error={clientsError}
        errorComp={
          <SelectOption value="">
            Échec de la récupération des données
          </SelectOption>
        }
        isLoading={clientsLoading}
        isLoadingComp={<SelectOption value="">Chargement...</SelectOption>}
        data={clients}
        dataComp={(usrs) =>
          usrs.length > 0 ? (
            usrs.map((u) => (
              <SelectOption key={u.id} value={u.id}>
                {u.name}
              </SelectOption>
            ))
          ) : (
            <SelectOption value="">
              Aucune donnée client n&apos;est disponible
            </SelectOption>
          )
        }
      />
    </Select>
  );
}
