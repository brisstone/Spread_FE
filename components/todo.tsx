import { Props } from "@/types/props";
import { HTMLProps, useState } from "react";
import IconButton from "./iconbutton";
import Image from "next/image";
import Checkbox from "./checkbox/index";
import { KeyedMutator, mutate } from "swr";
import { Task } from "@/types/general";
import { checkAndUncheckNotes, checkAndUncheckTask } from "@/services";
import { useAlert } from "@/contexts/alert-context";
import Input from "./input";

export function TodoItem(props: {
  id: string;
  text: string;
  details?: string;
  checked?: boolean;
  mutate?: KeyedMutator<Task[][]>;
}) {
  const [detailShown, setDetailsShown] = useState(false);

  const { pushAlert } = useAlert();

  return (
    <li className="w-full block py-5 border-b border-solid border-b-active-icon last:border-b-0">
      <div className="flex items-start w-full gap-2">
        <div className="grow">
          <div className="flex w-full items-center">
            <label
              htmlFor={props.id}
              className="cursor-pointer basis-[50%] max-w-[50%]"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  type="checkbox"
                  checked={!!props.checked}
                  id={props.id}
                  name={props.id}
                  onChange={(e) => {
                    checkAndUncheckNotes(props.id, !props.checked)
                      .then(() => {
                        if (props.mutate) props.mutate();
                      })
                      .catch((e) => {
                        pushAlert(e.message);
                      });
                  }}
                  // value={props.id}
                  // className="translate-y-full"
                  // {...props}
                />
                <p
                  className={`text-[20px] text-greyish ${
                    props.checked ? "line-through" : ""
                  }`}
                >
                  {props.text}
                </p>
              </div>
            </label>

            <div className="flex grow justify-between items-center">
              <div className="flex items-center gap-7">
                <label htmlFor="dueDate">
                  <IconButton
                    iconUrl="/images/todocalendar.svg"
                    width={21}
                    height={21}
                  />

                  <Input
                    header="Date limite"
                    id="dueDate"
                    placeholder="Date limite"
                    className="mt-2 !hidden"
                    smallerYPadding
                    type="datetime-local"
                    // {...getFieldProps("dueDate")}
                    onChange={(e) => {}}
                  />
                </label>

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
