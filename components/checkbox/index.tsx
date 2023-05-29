import { HTMLProps } from "react";
import styles from "./checkbox.module.css";
import { omit } from "lodash";

export default function Checkbox(props: HTMLProps<HTMLInputElement>) {
  return (
    <label
      className={`${styles.container} ${props.className}`}
      htmlFor={props.id}
    >
      <input
        type="checkbox"
        className={styles.input}
        {...omit(props, ["className"])}
      />
      <div className={styles.checkboxBg}></div>
    </label>
  );
}

export function Radio(props: HTMLProps<HTMLInputElement>) {
  return (
    <label
      className={`${styles.container} ${props.className}`}
      htmlFor={props.id}
    >
      <input
        type="radio"
        className={styles.input}
        {...omit(props, ["className"])}
      />
      <div className={styles.checkboxBg}></div>
    </label>
  );
}
