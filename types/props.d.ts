import { ReactNode } from "react";

type Props = {
  children?: ReactNode
  className?: string;
};

interface PropWithActive extends Props {
  active?: boolean;
}

interface HeaderSubtitle {
  header: string;
  subtitle: string;
}