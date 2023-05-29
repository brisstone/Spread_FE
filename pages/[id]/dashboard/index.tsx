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
import dummyChartData from "@/data/dummy-chart";
import { getUserName, valueFormatter } from "@/lib/util";

export default function Home() {
  const { user } = useUser();

  return (
    <Layout>
      <LayoutHeader>
        {user && `Bienvenue, ${user.firstName || user.email} ! 👋`}
      </LayoutHeader>
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
                data={dummyChartData}
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
