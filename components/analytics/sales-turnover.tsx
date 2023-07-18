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
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
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
      <div className="flex flex-wrap">
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 h-96">
          <CardR className="max-w-lg">
            <Title className="text-sm">Taux de Satisfaction</Title>
            <div className="text-xs">Tous les clients</div>
            <DonutChart
              className="mt-6"
              data={cities}
              category="sales"
              index="name"
              valueFormatter={valueFormatter}
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
             <div className="rounded-xl w-[180px] h-[80px] bg-[#47288C] flex flex-col justify-center text-sm" >
                  <div className="text-[#FFFFFF] ml-4 text-lg ml-20">95%</div>
                  <div className="text-[#A0AEC0] ml-4 text-sm">Basé sur leurs retours</div>
                </div>
          </CardR>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/5 px-2">
          <CardR className="max-w-lg">
            <Title className="mb-8">Apporteurs d’affaires</Title>
            <div className="flex">
              <div className="w-1/2 space-y-4 ">
                <div className="rounded-xl w-[180px] h-[80px] bg-[#47288C] flex flex-col justify-center text-sm " >
                  <div className="text-[#A0AEC0] ml-4 ">Personnes Invitées</div>
                  <div className="text-[#FFFFFF] ml-4">145 people</div>
                </div>
                <div className="rounded-xl w-[180px] h-[80px] bg-[#47288C] flex flex-col justify-center text-sm" >
                  <div className="text-[#A0AEC0] ml-4">Bonus</div>
                  <div className="text-[#FFFFFF] ml-4">1,465</div>
                </div>
                
              </div>
              <div className=" w-1/2">
                {" "}
                <DonutChart
                  className="mb-12 bg-green"
                  data={cities}
                  category="sales"
                  index="name"
                  valueFormatter={valueFormatter}
                  colors={[
                    "slate",
                    "violet",
                    "indigo",
                    "rose",
                    "cyan",
                    "amber",
                  ]}
                />
              </div>
            </div>
          </CardR>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/5 px-2">
          <CardR className="max-w-lg">
            <Title>Number of species threatened with extinction (2021)</Title>
            <Subtitle>
              The IUCN Red List has assessed only a small share of the total
              known species in the world.
            </Subtitle>
            <BarChart
              className="mt-6"
              data={chartdata}
              index="name"
              categories={["Number of threatened species"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          </CardR>
        </div>
      </div>
    </Card>
  );
}
