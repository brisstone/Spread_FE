import useSWR from 'swr';
import { ListItem } from "./list";

export default function ConversationsList() {
  const { data, error, isLoading } = useSWR('/messaging/conversations');
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
