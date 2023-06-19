import Image from "next/image";
import Tag from "../tag";
import { Expense } from "@/types/general";
import { ExpenseType, expenseTypeMap } from "@/types/enum";
import {
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableRow,
  TableRowCell,
} from "../table";

export function RecentExpenseItem(props: {
  name: string;
  description: string | null;
  currency: string;
  amount: number;
}) {
  return (
    <div className="flex py-5 gap-7 items-center border-b border-solid border-[#CECECE] last:border-0">
      <Image
        src="/images/profilecompany.png"
        height={50}
        width={50}
        alt="expense item icon"
        className="rounded-full w-[50px] h-[50px]"
      />

      <div className="grow">
        <p className="text-base">{props.name}</p>
        <p className="text-base text-icon"></p>
      </div>

      <p className="text-[#FF0000] text-lg">
        - {props.currency} {props.amount}
      </p>
    </div>
  );
}

export function ExpenseTableRow(props: {
  data: Expense;
  smallerPadding?: boolean;
}) {
  const { data } = props;
  return (
    <TableRow>
      <TableRowCell smallerPadding={props.smallerPadding}>
        <div className="flex">
          <Image
            src="/images/xd.png"
            height={20}
            width={20}
            alt="avatar"
            className="object-cover w-5 h-5"
          />
          <span className="text-base ml-4">{data.name}</span>
        </div>
      </TableRowCell>
      <TableRowCell smallerPadding={props.smallerPadding}>
        <Tag
          className={`${
            (data.type === ExpenseType.MONTHLY && "!bg-[#BC7EFF]") ||
            (data.type === ExpenseType.UNIQUE && "!bg-btn") ||
            (data.type === ExpenseType.MONTHLY && "!bg-[#A23FFF]")
          } text-[9px] leading-[150%]`}
        >
          {expenseTypeMap[data.type]}
        </Tag>
      </TableRowCell>
      <TableRowCell smallerPadding={props.smallerPadding}>
        <span className="text-base">
          {data.currency.name} {data.amount}
        </span>
      </TableRowCell>
      <TableRowCell smallerPadding={props.smallerPadding}>
        <Tag className="!bg-btn !text-[9px] !leading-[150%]">
          {data.category.name}
        </Tag>
      </TableRowCell>
    </TableRow>
  );
}

export function ExpenseTableHead() {
  return (
    <TableHead>
      <TableHeadRow>
        <TableHeadCell>Depense</TableHeadCell>
        <TableHeadCell>Récurrence</TableHeadCell>
        <TableHeadCell>Montant</TableHeadCell>
        <TableHeadCell>Catégorie</TableHeadCell>
      </TableHeadRow>
    </TableHead>
  );
}
