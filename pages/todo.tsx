import Button from "@/components/button";
import Card from "@/components/card";
import { BaseHDivider } from "@/components/divider";
import Layout, { LayoutHeader } from "@/components/layout";
import { ScrollableList } from "@/components/list";
import { TodoItem } from "@/components/todo";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis ipsum quis ligula pharetra iaculis eget sed nisl. Praesent sodales erat vel nulla finibus, eget dictum nisl mollis. Donec dapibus nunc ut elit mattis gravida. Etiam mollis pulvinar arcu vel lacinia. Fusce venenatis purus dui, sit amet vestibulum neque eleifend at. Vestibulum malesuada malesuada ante, sit amet varius neque laoreet ac. Phasellus ac ligula vel ante volutpat consectetur ornare ac libero. Donec quis cursus massa.
Fusce interdum scelerisque augue maximus euismod. Quisque nulla dui, molestie cursus justo vel, efficitur posuere ligula. Nunc vel diam et sapien ornare finibus. Phasellus sed lacus vitae quam finibus porttitor et ut quam. Quisque sodales efficitur turpis id euismod. Vivamus vel erat vel neque sollicitudin luctus. Vestibulum eleifend egestas euismod. Fusce laoreet sapien id dolor rutrum, non eleifend magna mattis. Quisque nulla metus, ullamcorper at massa a, iaculis ullamcorper leo. Suspendisse vel ipsum cursus magna mattis consectetur at nec mauris. Donec vehicula augue in sem congue, non tincidunt quam semper. Nullam convallis felis nisl, in pellentesque urna bibendum et. Duis quis neque sem.
Sed faucibus urna ut lectus placerat, et vulputate nibh convallis. Suspendisse enim est, fermentum cursus laoreet sit amet, bibendum convallis nulla. Vestibulum lectus libero, pharetra nec quam et, auctor tempor odio. Donec malesuada velit sed risus convallis molestie. Phasellus semper leo ornare aliquam feugiat. Etiam vitae magna dapibus, efficitur leo eu, tincidunt eros. Nullam odio elit, aliquam vitae est vel, tempus ullamcorper enim.
`;

export default function Todo() {
  return (
    // <Layout header="To Do List  ✅">
    <>
      <LayoutHeader>To Do List ✅</LayoutHeader>
      <Card className="flex flex-col grow sticky p-10">
        <p className="text-[30px] leading-[35px]">Tâches 🎯</p>
        <BaseHDivider className="mt-5" />

        <div className="flex flex-col w-full grow justify-between">
          <ScrollableList className="w-full grow mt-5">
            <TodoItem id="1" text="Finir Site web" details={text} />
            <TodoItem id="2" text="Finir Site web" details={text} />
            <TodoItem id="3" text="Finir Site web" details={text} />
            <TodoItem id="4" text="Finir Site web" details={text} />
            <TodoItem id="1" text="Finir Site web" details={text} />
            <TodoItem id="2" text="Finir Site web" details={text} />
            <TodoItem id="3" text="Finir Site web" details={text} />
            <TodoItem id="4" text="Finir Site web" details={text} />
          </ScrollableList>
          <div className="mt-8 flex gap-6">
            <Button
              iconUrl="/images/plus.svg"
              className="shadow-none !text-base"
            >
              Nouvelle Tâche
            </Button>

            <Button className="shadow-none !text-base bg-white text-black">
              Modifier
            </Button>
          </div>
        </div>
      </Card>
    </>

    // </Layout>
  );
}

Todo.Layout = Layout;
