import { Props } from "@/types/props";

interface CardHeaderProps {
  title: string;
  subTitle: string;
  titleClasses?: string;
  subTitleClasses?: string;
}

export default function Card(props: Props) {
  return (
    <div className={`h-fit rounded-2xl bg-gradient-card backdrop-blur-3xl ${props.className}`}>
      {props.children}
    </div>
  );
}

export function CardHeader(props: CardHeaderProps) {
  return (
    <div>
      <p className={`text-lg text-white ${props.titleClasses}`}>
        {props.title}
      </p>
      <p className={`text-base text-subtitle ${props.subTitleClasses}`}>
        {props.subTitle}
      </p>
    </div>
  );
}

export function CardContent(props: Props) {
  return (
    <div className="mt-4 w-full">
      {props.children}
    </div>
  )
}
