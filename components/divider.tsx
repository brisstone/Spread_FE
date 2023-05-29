import { Props } from "@/types/props";


/**
 * Horizontal gradient divider
 * @param props Props
 * @returns JSX.Element
 */
export function GradientHDivider(props: Props) {
  return (
    <div className={`h-px w-full bg-gradient-horizdivider ${props.className}`}></div>
  );
}

export function BaseHDivider(props: Props) {
  return (
    <div className={`h-px w-full bg-dim-white ${props.className}`}></div>
  );
}

export function VerticalDivider(props:Props) {
  return (
    <div className={`w-px bg-divider ${props.className}`}></div>
  )
}