import Cookies from "js-cookie";
import { ListItem } from "./list";

console.log(Cookies.get('accessToken')  )

export default function ConversationsList() {
  return (
    <ul>
      <ListItem
        primaryText="📩 Demi Wikinson"
        secondaryText="1 Nouveau Message | En Ligne"
      />
      <ListItem
        active
        primaryText="📩 Demi Wikinson"
        secondaryText="1 Nouveau Message | En Ligne"
      />
      <ListItem
        primaryText="📩 Demi Wikinson"
        secondaryText="1 Nouveau Message | En Ligne"
      />
    </ul>
  );
}
