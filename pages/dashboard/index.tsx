import Card, { CardContent, CardHeader } from "@/components/card";
import {
  AreaChart,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import KPI from "@/components/kpi";
import Layout, { LayoutHeader } from "@/components/layout";
import CustomTable from "@/components/table";
import useUser from "@/data/use-user";

const data = [
  {
    Month: "Jan 21",
    "Gross Volume": 2890,
    "Successful Payments": 2400,
    Customers: 4938,
  },
  {
    Month: "Feb 21",
    "Gross Volume": 1890,
    "Successful Payments": 1398,
    Customers: 2938,
  },
  {
    Month: "Mar 21",
    "Gross Volume": 2190,
    "Successful Payments": 1900,
    Customers: 1638,
  },
  {
    Month: "Apr 21",
    "Gross Volume": 3470,
    "Successful Payments": 3908,
    Customers: 2138,
  },
  {
    Month: "May 21",
    "Gross Volume": 2170,
    "Successful Payments": 4800,
    Customers: 2142,
  },
  {
    Month: "Jun 21",
    "Gross Volume": 3170,
    "Successful Payments": 3800,
    Customers: 5120,
  },
  {
    Month: "Jul 21",
    "Gross Volume": 3490,
    "Successful Payments": 4300,
    Customers: 3890,
  },
  {
    Month: "Aug 21",
    "Gross Volume": 2190,
    "Successful Payments": 4100,
    Customers: 3165,
  },
  {
    Month: "Sep 21",
    "Gross Volume": 3344,
    "Successful Payments": 4934,
    Customers: 1945,
  },
  {
    Month: "Oct 21",
    "Gross Volume": 1564,
    "Successful Payments": 1245,
    Customers: 2345,
  },
  {
    Month: "Nov 21",
    "Gross Volume": 3345,
    "Successful Payments": 2654,
    Customers: 4845,
  },
  {
    Month: "Dec 21",
    "Gross Volume": 2740,
    "Successful Payments": 3421,
    Customers: 2945,
  },
  {
    Month: "Jan 22",
    "Gross Volume": 3890,
    "Successful Payments": 2980,
    Customers: 2645,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Home() {
  const { user } = useUser();

  return (
    <Layout>
      <LayoutHeader>{ user && `Bienvenue, ${user.firstName || 'Alvyn'} ! 👋` }</LayoutHeader>
      <div className="w-full">
        <div className="flex w-full gap-6">
          <KPI className="grow" />
          <KPI className="grow" />
          <KPI className="grow" />
          <KPI className="grow" />
        </div>

        <Card className="w-full mt-5">
          <div className="p-7">
            <CardHeader
              title="Chiffre d’Affaires 💰"
              subTitle="(+5k) ce mois ci en 2023"
            />

            <CardContent>
              <AreaChart
                className="mt-8 h-44"
                data={data}
                categories={["Gross Volume"]}
                index="Month"
                colors={["indigo"]}
                valueFormatter={valueFormatter}
                showYAxis={false}
                showLegend={false}
              />
            </CardContent>
          </div>
        </Card>

        <Card className="w-full mt-5">
          <div className="p-7">
            <CardHeader
              title="Projets ⌛"
              subTitle="30 Accomplis ce mois ci."
            />

            <CardContent>
              <CustomTable />
            </CardContent>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
