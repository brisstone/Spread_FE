import Image from "next/image";
import Tag from "../tag";
import { Expense } from "@/types/general";
import { ExpenseType, expenseTypeMap } from "@/types/enum";

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

export function ExpenseTableRow(props: { data: Expense, smallerPadding?: boolean }) {
  const { data } = props;
  return (
    <tr className="border-b border-solid border-[#56577A] last:border-0">
      <td className={`${props.smallerPadding ? 'py-4' : 'py-5'}`}>
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
      </td>
      <td className={`${props.smallerPadding ? 'py-4' : 'py-5'}`}>
        <Tag
          className={`${
            (data.type === ExpenseType.MONTHLY && "!bg-[#BC7EFF]") ||
            (data.type === ExpenseType.UNIQUE && "!bg-btn") ||
            (data.type === ExpenseType.MONTHLY && "!bg-[#A23FFF]")
          } text-[9px] leading-[150%]`}
        >
          {expenseTypeMap[data.type]}
        </Tag>
      </td>
      <td className={`${props.smallerPadding ? 'py-4' : 'py-5'}`}>
        <span className="text-base">
          {data.currency.name} {data.amount}
        </span>
      </td>
      <td className={`${props.smallerPadding ? 'py-4' : 'py-5'}`}>
        <Tag className="!bg-btn !text-[9px] !leading-[150%]">{data.category.name}</Tag>
      </td>
    </tr>
  );
}

export function ExpenseTableHead() {
  return (
    <thead>
      <tr className="border-b border-solid border-[#56577A]">
        <th className="text-left text-[10px] leading-[150%] text-obsec font-normal py-3">
          Depense
        </th>
        <th className="text-left text-[10px] leading-[150%] text-obsec font-normal py-3">
          Récurrence
        </th>
        <th className="text-left text-[10px] leading-[150%] text-obsec font-normal py-3">
          Montant
        </th>
        <th className="text-left text-[10px] leading-[150%] text-obsec font-normal py-3">
          Catégorie
        </th>
      </tr>
    </thead>
  );
}
