import { Props } from "@/types/props";
import { VerticalDivider } from "../divider";
import IconButton from "../iconbutton";
import { Invoice } from "@/types/general";

function InvoiceTag({ paid }: { paid: boolean }) {
  return (
    <div className={`px-4 py-1 rounded-[7px] ${paid ? "bg-btn" : "bg-grey2"}`}>
      <span
        className={`text-base leading-[17px] ${
          paid ? "text-white" : "text-black"
        }`}
      >
        {paid ? "Payé" : "Envoyé"}
      </span>
    </div>
  );
}

function StatusContainer(
  props: Props & { heading: string; first?: string; second?: string }
) {
  return (
    <div
      className={`flex flex-col items-center gap-8 w-1/4 px-5 ${props.className}`}
    >
      <div className="text-md">{props.heading}</div>
      <div className="w-full">
        {props.first && (
          <p className="text-center text-base leading-[26px] text-ellipsis overflow-hidden whitespace-nowrap">
            {props.first}
          </p>
        )}
        {props.second && (
          <p className="text-center text-base text-obsec leading-[21px] text-ellipsis overflow-hidden whitespace-nowrap">
            {props.second}
          </p>
        )}
      </div>
      {props.children}
    </div>
  );
}

export default function InvoiceListItem(
  props: Props & {
    data: Invoice;
  }
) {
  return (
    <li
      className={`flex items-center justify-between w-full pr-6 ${props.className}`}
    >
      <div className="flex items-start w-3/4 max-w-[75%]">
        <StatusContainer className="" heading="Statut">
          <InvoiceTag paid={!!props.data.paidAt} />
        </StatusContainer>
        <VerticalDivider className="self-stretch" />
        <StatusContainer
          heading="Facture"
          first={props.data.name}
          second={new Date(props.data.createdAt).toLocaleDateString()}
        />
        <VerticalDivider className="self-stretch" />
        <StatusContainer
          heading="Client"
          first={props.data.client.name}
          second={props.data.client.email}
        />
        <VerticalDivider className="self-stretch" />
        <StatusContainer
          heading="Montant"
          first={`${props.data.currency.name} ${props.data.items.reduce(
            (a, b) => a + b.total,
            0
          )}`}
          second="Sent 1m"
        />
      </div>

      <div>
        <IconButton
          iconUrl="/images/edit-outline.svg"
          height={18}
          width={18}
          // TODO edge not working, fix
          // edge="left"
        />
        <IconButton
          className="mt-8"
          iconUrl="/images/bin.svg"
          height={18}
          width={14}
          // TODO edge not working, fix
          // edge="left"
        />
      </div>
    </li>
  );
}
