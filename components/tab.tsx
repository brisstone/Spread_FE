import { Props } from "@/types/props";
import React, { ReactNode } from "react";

interface TabItemProps extends Props {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function TabItem(props: TabItemProps) {
  return (
    <div onClick={props.onClick} className={`${props.active ? "bg-btn" : "bg-transparent"} text-white grow flex justify-center items-center py-2 px-2 rounded-lg cursor-pointer`}>
      <span className="truncate text-base">{props.children}</span>
    </div>
  );
}

interface TabPanelProps extends Props {
  value: number;
  index: number;
}

export function TabPanel(props: TabPanelProps) {
  return (
    <>
      {props.value === props.index && props.children}
    </>
  )
}

interface TabProps extends Omit<Props, 'children'> {
  value: number;
  children: JSX.Element[];
  onChange: (newValue: number) => any;
}

export default function Tab(props: TabProps) {

  // apply active and onclick functions to TabItem props
  const childrenWithProps = React.Children.map(props.children, (child: React.ReactElement<TabItemProps>, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClick: ((e: React.SyntheticEvent) => {
          props.onChange(index);
        }),
        active: props.value === index,
      });
    }
    return child;
  });

  return <div className={`flex bg-icon-back p-3 rounded-lg ${props.className}`}>
    {childrenWithProps}
  </div>;
}




