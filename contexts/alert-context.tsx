import { AlertType } from "@/types/enum";
import { Props } from "@/types/props";
import { FC, createContext, useContext, useMemo, useState } from "react";

interface Alert {
  message: string;
  type: AlertType;
}

interface AlertContextState {
  alerts: Alert[];
  pushAlert: (value: string, type?: AlertType) => void;
}

export const AlertContext = createContext<AlertContextState>({
  alerts: [],
  pushAlert: () => {},
});

export function AlertContextProvider(props: Props) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const pushAlert = (alert: string, type: AlertType = AlertType.ERROR) => {
    setAlerts((prev) => [...prev, { message: alert, type }]);
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
