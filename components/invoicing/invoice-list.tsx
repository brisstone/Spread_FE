import useSWRInfinite from "swr/infinite";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import InvoiceListItem from "./invoice-list-item";
import { Invoice } from "@/types/general";
import { getPgKey } from "@/lib/util";
import { ScrollableList } from "../list";
import Fetched from "../fetched";
import { Feedback } from "../feedback";
import { InvoiceType } from "@/types/enum";

export function InvoiceList({
  type,
}: {
  type: InvoiceType;
}) {
  const {
    data: items,
    error,
    isLoading: itemsLoading,
    size,
    mutate,
    setSize,
  } = useSWRInfinite<Invoice[]>(
    getPgKey<Invoice>(
      () => `/invoices?type=${type}`
    )
  );

  const { observerTarget } = useInfiniteScroll(setSize);

  return (
    <div className="grow flex flex-col px-5 py-12">
      <ScrollableList className="grow relative w-full">
        <Fetched
          error={error}
          isLoading={itemsLoading}
          data={items}
          dataComp={(invoices) => {
            const inv = invoices.flat();

            return inv.length > 0 ? (
              inv.map((i) => (
                <InvoiceListItem
                  data={i}
                  key={i.id}
                  className="mt-20 first:mt-0"
                />
              ))
            ) : (
              <Feedback msg="Vous n'avez pas de factures ici" />
            );
          }}
        />
        <li className="h-px" ref={observerTarget}></li>
      </ScrollableList>
    </div>
  );
}
