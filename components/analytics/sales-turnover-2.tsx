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

export default function SalesTurnoverChart2(props: Props) {
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
      <div className="flex flex-wrap" style={{background:"#22053E"}}>
        <div
          style={{ borderRadius: "100px" }}
          className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 h-96 rounded-md"
        >
          <div className="max-w-lg p-4">
            <Title className="text-sm text-[#ccc] mb-6">Taux de Satisfaction</Title>
            <div className="text-xs">Tous les clients</div>
            <div style={{ marginTop: "-50px", zIndex: "-1" }}>
              <DonutChart
                className="mt-6"
                data={cities}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={[
                  "violet",
                  "violet",
                  "violet",
                  "violet",
                  "violet",
                  "violet",
                ]}
              />
            </div>

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="203"
              height="202"
              viewBox="0 0 203 202"
              fill="none"
            >
              <path
                d="M198.241 68.1397C201.456 66.8204 203.009 63.1353 201.501 60.0049C194.87 46.2369 185.329 34.0417 173.509 24.2777C160.07 13.1758 144.1 5.55968 127.014 2.10395C109.928 -1.3518 92.2537 -0.540469 75.5563 4.46605C58.8589 9.47255 43.654 18.5197 31.2882 30.8062C18.9225 43.0926 9.77775 58.2391 4.66394 74.9039C-0.449863 91.5688 -1.37485 109.238 1.97093 126.345C5.31671 143.453 12.83 159.472 23.8452 172.982C33.533 184.864 45.6666 194.484 59.3916 201.203C62.5123 202.731 66.2072 201.202 67.5472 197.996C68.8872 194.79 67.3631 191.124 64.2547 189.571C52.4337 183.667 41.9772 175.309 33.5972 165.031C23.8896 153.124 17.2681 139.007 14.3195 123.93C11.3709 108.853 12.1861 93.2818 16.6929 78.5951C21.1996 63.9085 29.2589 50.5599 40.1568 39.7319C51.0546 28.9039 64.4547 20.9307 79.1701 16.5184C93.8854 12.1062 109.462 11.3912 124.52 14.4367C139.577 17.4823 153.651 24.1943 165.495 33.9784C175.72 42.4243 184.009 52.9343 189.838 64.7931C191.371 67.9114 195.027 69.459 198.241 68.1397Z"
                fill="url(#paint0_linear_642_17372)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_642_17372"
                  x1="197.799"
                  y1="159"
                  x2="28.4614"
                  y2="61.2331"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#BC96E6" />
                  <stop offset="1" stop-color="#BC96E6" />
                </linearGradient>
              </defs>
            </svg> */}
            <div
              style={{
                background:
                  "linear-gradient(175deg, #291A37 0%, rgba(109, 61, 237, 0.50) 100%)",
                backdropFilter: "blur(60px)",
                marginTop: "-50px",
                display: "flex",
                zIndex: "1000000000000",
              }}
              className="rounded-xl w-[180px] h-[80px] bg-[#47288C] flex flex-col justify-center items-center text-sm p-1"
            >
               <div className="flex items-between justify-between text-[#ccc] w-[100%]">
                <div>0%</div>
                <div>100%</div>
               </div>
              <div className="text-[#FFFFFF] ml-4 text-lg ml-20">95%</div>
              <div className="text-[#A0AEC0] ml-4 text-sm">
                Basé sur leurs retours
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/5 px-2 rounded-lg">
          <div className="max-w-lg bg-[#241533] p-4">
            <Title className="mb-8 text-[#ccc]">Apporteurs d’affaires</Title>
            <div className="flex">
              <div className="w-1/2 space-y-4 ">
                <div
                  style={{
                    background:
                      "linear-gradient(175deg, #291A37 0%, rgba(109, 61, 237, 0.50) 100%)",
                    backdropFilter: "blur(60px)",
                  }}
                  className="rounded-xl w-[180px] h-[80px] bg-[#47288C] flex flex-col justify-center text-sm "
                >
                  <div className="text-[#A0AEC0] ml-4 ">Personnes Invitées</div>
                  <div className="text-[#FFFFFF] ml-4">145 people</div>
                </div>
                <div
                  style={{
                    background:
                      "linear-gradient(175deg, #291A37 0%, rgba(109, 61, 237, 0.50) 100%)",
                    backdropFilter: "blur(60px)",
                  }}
                  className="rounded-xl w-[180px] h-[80px] bg-[#47288C] flex flex-col justify-center text-sm"
                >
                  <div className="text-[#A0AEC0] ml-4">Bonus</div>
                  <div className="text-[#FFFFFF] ml-4">1,465</div>
                </div>
              </div>
              <div
                className="w-1/2"
                style={{ position: "relative"}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="193"
                  height="206"
                  viewBox="0 0 193 206"
                  fill="none"
                >
                  <path
                    d="M188.877 59.1477C192.111 57.4964 193.412 53.5237 191.558 50.4019C183.276 36.4583 171.801 24.6389 158.041 15.9396C142.425 6.06686 124.44 0.576164 105.973 0.0429122C87.5053 -0.490339 69.2343 3.95349 53.0745 12.9087C36.9147 21.8639 23.461 35.0008 14.1235 50.9427C4.78586 66.8847 -0.0919045 85.0447 0.00131101 103.52C0.0945265 121.995 5.15529 140.105 14.6533 155.951C24.1513 171.798 37.7368 184.799 53.9861 193.59C68.3041 201.337 84.2259 205.565 100.438 205.968C104.068 206.058 106.897 202.981 106.756 199.353C106.614 195.724 103.555 192.923 99.9265 192.799C86.0737 192.325 72.4862 188.65 60.243 182.026C46.068 174.357 34.2168 163.016 25.9313 149.192C17.6458 135.368 13.2311 119.57 13.1498 103.453C13.0684 87.3368 17.3235 71.495 25.4691 57.5882C33.6147 43.6814 45.3509 32.2215 59.4478 24.4094C73.5447 16.5974 89.4833 12.7209 105.593 13.1861C121.703 13.6512 137.392 18.441 151.014 27.0534C162.781 34.4921 172.631 44.546 179.821 56.3968C181.704 59.5011 185.643 60.7989 188.877 59.1477Z"
                    fill="url(#paint0_linear_642_17402)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_642_17402"
                      x1="103"
                      y1="0"
                      x2="103"
                      y2="190"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#BC96E6" />
                      <stop offset="1" stop-color="#BC96E6" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div
                  className=""
                  style={{ position: "absolute", right: "25%", top: "30%" }}
                >
                  <div className="text-[#A0AEC0]">Safety</div>
                  <div className="text-[#FFFFFF]">9.3</div>
                  <div className="text-[#A0AEC0]">Total Score</div>
                </div>
                {/* <DonutChart
                  className="mb-12 bg-green"
                  data={cities}
                  category="sales"
                  index="name"
                  valueFormatter={valueFormatter}
                  colors={[
                    "violet",
                    "violet",
                    "violet",
                    "violet",
                    "violet",
                    "violet",
                  ]}
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/5 px-2 rounded-lg">
          <div className="max-w-lg bg-[#241533] p-4">
            {/* <Title>Number of species threatened with extinction (2021)</Title>
            <Subtitle>
              The IUCN Red List has assessed only a small share of the total
              known species in the world.
            </Subtitle> */}
            <BarChart
              className="mt-6"
              data={chartdata}
              index="name"
              categories={["Clients Actuels"]}
              colors={["zinc"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
              borderRadius={100}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
