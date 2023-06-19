import useSWR from "swr";
import Card, { CardContent, CardHeader } from "@/components/card";
import Fetched from "@/components/fetched";
import { ClientTurnover } from "@/types/general";
import moment from "moment";
import { AreaChart } from "@tremor/react";
import { valueFormatter } from "@/lib/util";
import { Feedback } from "@/components/feedback";
import { Props } from "@/types/props";

export default function ClientTurnoverChart(props: Props) {
  const {
    data: ct,
    error: ctError,
    isLoading: ctLoading,
  } = useSWR<ClientTurnover[]>("/enterprise/analytics/client-turnovers");

  return (
    <Card className={props.className}>
      <div className="p-7 relative">
        <CardHeader
          title="Chiffre d’Affaires 💰"
          subTitle="(+5k) ce mois ci en 2023"
        />

        <CardContent>
          <Fetched
            error={ctError}
            isLoading={ctLoading}
            data={ct?.map((c) => ({
              ...c,
              monthCreatedText: moment()
                .month(c.monthCreated - 1)
                .format("MMM"),
            }))}
            dataComp={(d) =>
              d.length > 0 ? (
                <AreaChart
                  className="mt-8 h-44"
                  categories={["totalClients"]}
                  data={d}
                  index="monthCreatedText"
                  colors={["indigo"]}
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
