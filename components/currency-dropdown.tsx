import useSWR from 'swr';
import Select, { SelectOption, SelectProps } from './select';
import { InvoiceCurrency } from '@/types/general';
import Fetched from './fetched';

export default function CurrenciesDropdown(
  props: SelectProps
) {
  const {
    data: currencies,
    isLoading: currenciesLoading,
    error: currenciesError,
  } = useSWR<InvoiceCurrency[]>(
    '/invoices/currencies'
  );

  return (
    <Select
      {...props}
      // errorText={touched.team && errors.team}
    >
      <SelectOption value="">Devise</SelectOption>
      <Fetched
        error={currenciesError}
        errorComp={
          <SelectOption value="">
            Échec de la récupération des données
          </SelectOption>
        }
        isLoading={currenciesLoading}
        isLoadingComp={<SelectOption value="">Chargement...</SelectOption>}
        data={currencies}
        dataComp={(usrs) =>
          usrs.length > 0 ? (
            usrs.map((u) => (
              <SelectOption key={u.id} value={u.id}>
                {u.name}
              </SelectOption>
            ))
          ) : (
            <SelectOption value="">
              Il n'y a pas de devises disponibles
            </SelectOption>
          )
        }
      />
    </Select>
  );
}