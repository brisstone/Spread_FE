import Card from "@/components/card";
import Checkbox from "@/components/checkbox/index";
import Glass from "@/components/glass";
import IconButton from "@/components/iconbutton";
import { KanbanCard, KanbanItem } from "@/components/kanban";
import Layout, { LayoutHeader } from "@/components/layout";
import { ScrollableList } from "@/components/list";
import Image from "next/image";

export default function Kanban() {
  return (
    <Layout header="Kanban 📄">
      <div className="flex flex-col grow">
        <div className="flex grow items-stretch gap-5">
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
        </div>
      </div>
    </Layout>
  );
}

Kanban.Layout = Layout;
