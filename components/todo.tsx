import { Props } from "@/types/props";
import { HTMLProps, useState } from "react";
import IconButton from "./iconbutton";
import Image from "next/image";
import Checkbox from "./checkbox/index";

export function TodoItem(props: {
  id: string;
  text: string;
  details?: string;
}) {
  const [detailShown, setDetailsShown] = useState(false);

  return (
    <li className="w-full block py-5 border-b border-solid border-b-active-icon last:border-b-0">
      <div className="flex items-start w-full gap-2">
        <div className="grow">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-3">
              <Checkbox
                type="checkbox"
                id={props.id}
                name={props.id}
                // value={props.id}
                // className="translate-y-full"
                // {...props}
              />
              <p className="text-[20px] text-greyish">{props.text}</p>
            </div>

            <div className="flex items-center gap-7">
              <IconButton
                iconUrl="/images/todocalendar.svg"
                width={21}
                height={21}
              />

              <Image
                src="/images/profilecompany.png"
                height={21}
                width={21}
                alt="company profile image"
                className="rounded-full border border-solid border-white"
              />
            </div>

            <div>
              <IconButton
                iconUrl="/images/dropdown.svg"
                width={12}
                height={12}
                onClick={() => {
                  setDetailsShown((prev) => !prev);
                }}
              />
            </div>
          </div>
          {detailShown && (
            <div className="w-full mt-1 transition-all">
              <p className="text-base text-subtitle break-words">
                {props.details}
              </p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
