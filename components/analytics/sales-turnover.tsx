import useSWR from "swr";
import Card, { CardContent, CardHeader } from "@/components/card";
import Fetched from "@/components/fetched";
import { TurnoverData } from "@/types/general";
import moment from "moment";
import { AreaChart, BarChart, Subtitle } from "@tremor/react";
import { valueFormatter } from "@/lib/util";
import { Feedback } from "@/components/feedback";
import { Props } from "@/types/props";
import { Card as CardR, Title, DonutChart } from "@tremor/react";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const chartdata = [
  {
    name: "Amphibians",
    "Clients Actuels": 2488,
  },
  {
    name: "Birds",
    "Clients Actuels": 1445,
  },
  {
    name: "Crustaceans",
    "Clients Actuels": 743,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export default function SalesTurnoverChart(props: Props) {
  const {
    data: ct,
    error: ctError,
    isLoading: ctLoading,
  } = useSWR<TurnoverData[]>("/enterprise/analytics/sales-turnovers");

  return (
    <Card className={props.className}>
      <div className="p-7 relative">
        <CardHeader
          title="Chiffre d’Affaires-- 💰"
          subTitle=""
          // subTitle="(+5k) ce mois ci en 2023"
        />

        <CardContent>
          <Fetched
            error={ctError}
            isLoading={ctLoading}
            data={ct?.map((c) => ({
              ...c,
              "Cette année": c.currentYearData,
              "L'année dernière": c.prevYearData,
              monthText: moment()
                .month(c.month - 1)
                .format("MMM"),
            }))}
            dataComp={(d) =>
              d.length > 0 ? (
                <AreaChart
                  className="mt-8 h-44"
                  categories={["Cette année", "L'année dernière"]}
                  data={d}
                  index="monthText"
                  colors={["indigo", "violet"]}
                  valueFormatter={valueFormatter}
                  showYAxis={false}
                  showLegend={false}
                />
              ) : (
                <Feedback noAbsolute msg="Pas de données disponibles" />
              )
            }
          />
        </CardContent>
      </div>
    </Card>
  );
}
