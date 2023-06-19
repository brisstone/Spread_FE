import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCellText,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableRow,
  TableRowCell,
} from "./table";
import Tag from "./tag";
import { Client, ClientWithTeam } from "@/types/general";
import Fetched from "./fetched";
import Image from "next/image";

export default function ClientsTable() {
  const {
    data: clients,
    error,
    isLoading,
  } = useSWR<ClientWithTeam[]>("/crm/clients?limit=6");

  return (
    <Table className="mt-5">
      <TableHead>
        <TableHeadRow>
          <TableHeadCell>NAME</TableHeadCell>
          <TableHeadCell>ÉQUIPE</TableHeadCell>
          {/* <TableHeadCell>BUDGET</TableHeadCell> */}
          <TableHeadCell>STATUT</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <Fetched
        error={error}
        isLoading={isLoading}
        data={clients}
        dataComp={(data) => (
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableRowCell smallerPadding>
                  <TableCellText>{d.name}</TableCellText>
                </TableRowCell>
                <TableRowCell smallerPadding>
                  <div className="flex gap-1">
                    {d.team.map((t) => (
                      <Image
                        key={t.id}
                        src={t.profileImageUrl || "/images/profilecompany2.png"}
                        height={22}
                        width={22}
                        alt="avatar"
                        className="rounded-full"
                      />
                    ))}
                  </div>
                </TableRowCell>
                {/* <TableRowCell smallerPadding>
                  <TableCellText>$12,000</TableCellText>
                </TableRowCell> */}
                <TableRowCell smallerPadding>
                  {/* <Badge color="emerald" icon={StatusOnlineIcon}> */}
                  <Tag>Client</Tag>
                  {/* </Badge> */}
                </TableRowCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      />
    </Table>
  );
}
