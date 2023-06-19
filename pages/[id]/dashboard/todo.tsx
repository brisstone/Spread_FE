import Card from "@/components/card";
import Layout from "@/components/layout";
import TodoList from "@/components/todo/todo-list";
import { TaskType } from "@/types/enum";

export function TaskHeader() {
  return <p className="text-[30px] leading-[35px]">Tâches 🎯</p>;
}

export default function Todo() {
  return (
    <Layout header="To Do List  ✅">
      <Card className="flex flex-col grow sticky p-10">
        <TodoList type={TaskType.ENTERPRISE} />
      </Card>
    </Layout>
  );
}

Todo.Layout = Layout;
