import { Props } from "@/types/props";
import Button from "./button";
import { ChangeEvent, DragEvent, HTMLProps, useState } from "react";
import Image from "next/image";
import { HtmlProps } from "next/dist/shared/lib/html-context";

export default function DragDropFile(
  props: Props &
    HTMLProps<HTMLInputElement> & {
      onFile: (file: File) => any;
    }
) {
  const [dragActive, setDragActive] = useState(false);

  // handle drag events
  const handleDragEnter = function (e: DragEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = function (e: DragEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = function (e: DragEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.onFile(e.dataTransfer.files[0]);
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.onFile(e.target.files[0]);
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
    }
  };

  return (
    <>
      <label
        id="label-file-upload"
        htmlFor={props.id}
        className={`${
          props.className
        } relative rounded-lg" htmlFor="input-file-upload border-dashed border-[#5A5A5A] border rounded-lg p-4 ${
          dragActive ? "bg-[rgba(255,255,255,0.2)]" : "bg-transparent"
        }`}
      >
        <input
          onChange={handleChange}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          type="file"
          id={props.id}
          className="w-full h-full absolute inset-0 opacity-0 z-50 rounded-lg"
        />

        <div className="flex flex-col justify-center items-center">
          <div className="w-10 h-10 flex justify-center items-center bg-btn rounded-full">
            <Image
              src="/images/caution.svg"
              height={16.67}
              width={16.67}
              alt="caution"
            />
          </div>
          <p className="text-center text-xs leading-5 mt-3">
            <span className="text-icon">Click to upload</span> or drag and drop
          </p>
          <p className="text-center text-xs leading-5">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
          {/* <Button className="upload-button">Upload a file</Button> */}
        </div>
      </label>
    </>
  );
}
