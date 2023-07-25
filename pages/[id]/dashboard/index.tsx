import useSWR from "swr";
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
import ClientsTable from "@/components/clients-table";
import useUser from "@/data/use-user";
import dummyChartData from "@/data/dummy-chart";
import { getUserName, valueFormatter } from "@/lib/util";
import ConversationsList from "@/components/conversation-list";
import { ConversationListType } from "@/types/enum";
import Fetched from "@/components/fetched";
import { ClientTurnover, IKPI } from "@/types/general";
import moment from "moment";
import { Feedback } from "@/components/feedback";
import ClientTurnoverChart from "../../../components/analytics/client-turnover";
import SalesTurnoverChart from "@/components/analytics/sales-turnover";

export function KPIGroup() {
  const {
    data: kpis,
    error: kpiError,
    isLoading: kpiLoading,
  } = useSWR<IKPI[]>("/enterprise/analytics/kpis");
  return (
    <div className="flex gap-6 w-full">
      <Fetched
        error={kpiError}
        isLoading={kpiLoading}
        data={kpis}
        dataComp={(ks) =>
          ks.map((k) => <KPI key={k.name} data={k} className="grow" />)
        }
      />
      {/* <KPI
        data={{
          name: "Aujourd’hui | C.A",
          value: "$12,000",
        }}
        className="grow"
      /> */}
    </div>
  );
}

export default function Home() {
  const { user } = useUser();

  return (
    <Layout>
      <LayoutHeader>
        {user && `Bienvenue, ${user?.firstName || user?.baseUser?.email} ! 👋`}
      </LayoutHeader>
      <KPIGroup />
      <div className="w-full flex gap-6">
        <div className="basis-3/4 max-w-[75%]">
          <SalesTurnoverChart className="w-full mt-5" />

          <Card className="w-full mt-5">
            <div className="p-7">
              <CardHeader title="Clients ⌛" subTitle="" />

              <CardContent>
                <ClientsTable />
              </CardContent>
            </div>
          </Card>
        </div>
        <div className="basis-1/4 max-w-[25%]">
          <Card className="p-7 mt-5">
            <CardHeader title="Conversations Récentes 💬 " subTitle="" />
            <ConversationsList noXPadding type={ConversationListType.TEAM} />
          </Card>
        </div>
      </div>
    </Layout>
  );
}
