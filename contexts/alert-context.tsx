import { Props } from "@/types/props";
import { FC, createContext, useContext, useMemo, useState } from "react";

interface AlertContextState {
  alerts: string[];
  pushAlert: (value: string) => void;
}

export const AlertContext = createContext<AlertContextState>({
  alerts: [],
  pushAlert: () => {},
});

export function AlertContextProvider(props: Props) {
  const [alerts, setAlerts] = useState<string[]>([]);

  const pushAlert = (alert: string) => {
    setAlerts((prev) => [...prev, alert]);
  };

  const value = useMemo(() => ({ alerts, pushAlert }), [alerts]);

  return (
    <AlertContext.Provider value={value}>
      {props.children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("Need to wrap GlobalDataProdiver");
  return context;
};
