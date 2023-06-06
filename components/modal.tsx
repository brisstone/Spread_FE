import { Props } from "@/types/props";
import Card from "./card";
import { createPortal } from "react-dom";
import { omit } from "lodash";
import Button from "./button";
import { Dispatch, SetStateAction, useState } from "react";

export type ModalProps = Props & { open: boolean; handleClose: () => any; stayPut?: boolean };

export default function Modal(props: ModalProps) {
  return createPortal(
    <div
      className={`${
        props.open ? "flex" : "hidden"
      } fixed left-0 top-0 w-screen h-screen justify-center items-center z-40 bg-backdrop`}
    >
      <div className="absolute inset-0" onClick={props.stayPut ? undefined : props.handleClose}></div>
      <Card className="m-8 max-h-[calc(100%_-_64px)] max-w-[600px] p-6 z-50">
        {props.children}
      </Card>
    </div>,
    document.getElementById("modal-render")!
  );
}

export function ConfirmationModal(
  props: ModalProps & {
    onConfirm: (s: Dispatch<SetStateAction<boolean>>) => any;
    onCancel: (s: Dispatch<SetStateAction<boolean>>) => any;
    text: string;
    question?: boolean;
  }
) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  return (
    <Modal {...omit(props, ["onConfirm", "onCancel", "text", "question"])} stayPut={isConfirming}>
      <p className="text-base">{props.text}</p>
      <div className="flex justify-end mt-6">
        <div className="flex gap-4">
          <Button
            className="!text-base bg-white text-black"
            onClick={() => props.onCancel(setIsCanceling)}
            loading={isCanceling}
          >
            Annuler
          </Button>
          <Button
            className="!text-base"
            onClick={() => {
              props.onConfirm(setIsConfirming)
            }}
            loading={isConfirming}
          >
            {!props.question ? "D'accord" : "Oui"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
