import Card from "@/components/card";
import { BaseHDivider } from "@/components/divider";
import Glass from "@/components/glass";
import Layout from "@/components/layout";
import { NoteGlass, Team } from "@/components/client-details";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import { title } from "process";
import { useState } from "react";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis ipsum quis ligula pharetra iaculis eget sed nisl. Praesent sodales erat vel nulla finibus, eget dictum nisl mollis. Donec dapibus nunc ut elit mattis gravida. Etiam mollis pulvinar arcu vel lacinia. Fusce venenatis purus dui, sit amet vestibulum neque eleifend at. Vestibulum malesuada malesuada ante, sit amet varius neque laoreet ac. Phasellus ac ligula vel ante volutpat consectetur ornare ac libero. Donec quis cursus massa.
Fusce interdum scelerisque augue maximus euismod. Quisque nulla dui, molestie cursus justo vel, efficitur posuere ligula. Nunc vel diam et sapien ornare finibus. Phasellus sed lacus vitae quam finibus porttitor et ut quam. Quisque sodales efficitur turpis id euismod. Vivamus vel erat vel neque sollicitudin luctus. Vestibulum eleifend egestas euismod. Fusce laoreet sapien id dolor rutrum, non eleifend magna mattis. Quisque nulla metus, ullamcorper at massa a, iaculis ullamcorper leo. Suspendisse vel ipsum cursus magna mattis consectetur at nec mauris. Donec vehicula augue in sem congue, non tincidunt quam semper. Nullam convallis felis nisl, in pellentesque urna bibendum et. Duis quis neque sem.
Sed faucibus urna ut lectus placerat, et vulputate nibh convallis. Suspendisse enim est, fermentum cursus laoreet sit amet, bibendum convallis nulla. Vestibulum lectus libero, pharetra nec quam et, auctor tempor odio. Donec malesuada velit sed risus convallis molestie. Phasellus semper leo ornare aliquam feugiat. Etiam vitae magna dapibus, efficitur leo eu, tincidunt eros. Nullam odio elit, aliquam vitae est vel, tempus ullamcorper enim.
`;

export default function ClientDetails() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout header="Brief Client 📝">
      <Card className="flex flex-col p-8 grow">
        <Tab
          value={tabIndex}
          onChange={(newValue) => {
            console.log("new value", newValue);
            setTabIndex(newValue);
          }}
          className="w-full"
        >
          <TabItem>Brief 📝</TabItem>
          <TabItem>Tâches 🎯</TabItem>
          <TabItem>Notes</TabItem>
          <TabItem>Équipe</TabItem>
        </Tab>

        <TabPanel value={tabIndex} index={0}>
          <NoteGlass title="Brief - Client X" note={text} />
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <NoteGlass title="Notes - Client X" note={text} />
        </TabPanel>

        <TabPanel value={tabIndex} index={3}>
          <Team />
        </TabPanel>
      </Card>
    </Layout>
  );
}
