import { Props } from "@/types/props";

export function TableRow(props: Props) {
  return (
    <tr className="border-b border-solid border-[#56577A] last:border-0">
      {props.children}
    </tr>
  );
}

export function TableRowCell(props: Props & { smallerPadding?: boolean }) {
  return (
    <td className={`${props.smallerPadding ? "py-4" : "py-5"}`}>
      {props.children}
    </td>
  );
}

export function TableHead(props: Props) {
  return <thead>{props.children}</thead>;
}

export function TableHeadRow(props: Props) {
  return (
    <tr className="border-b border-solid border-[#56577A]">{props.children}</tr>
  );
}

export function TableHeadCell(props: Props) {
  return (
    <th className="text-left text-[10px] leading-[150%] text-subtitle font-normal py-3">
      {props.children}
    </th>
  );
}

export function Table(props: Props) {
  return (
    <table className={`table-auto w-full ${props.className}`}>
      {props.children}
    </table>
  );
}

export function TableBody(props: Props) {
  return <tbody className={props.className}>{props.children}</tbody>;
}

export function TableCellText(props: Props) {
  return (
    <span className={`text-base ${props.className}`}>{props.children}</span>
  );
}
