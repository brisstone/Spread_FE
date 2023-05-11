import { Props } from "@/types/props";
import Card from "./card";

export default function Modal(props: Props & { open: boolean, handleClose: () => any }) {
  return (
    <div
      className={`${
        props.open ? "flex" : "hidden"
      } fixed left-0 top-0 w-screen h-screen justify-center items-center z-40 bg-backdrop`}
    >
      <div className="absolute inset-0" onClick={props.handleClose}></div>
      <Card className="m-8 max-h-[calc(100%_-_64px)] max-w-[600px] p-6 z-50">{props.children}</Card>
    </div>
  );
}
