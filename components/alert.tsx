import { useAlert } from "@/contexts/alert-context";
import { AlertType } from "@/types/enum";
import { useEffect, useState } from "react";

export default function Alert() {
  const { alerts } = useAlert();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  }, [alerts]);

  const latest = alerts[alerts.length - 1];

  return (
    <div
      className={`fixed top-4 right-4 p-3 ${
        show ? "opacity-100" : "opacity-0"
      } z-[999] transition-opacity ${
        latest && latest.type === AlertType.ERROR ? "bg-red-400" : "bg-green-400"
      } rounded-lg`}
    >
      <p className="text-base text-white">{latest && latest.message}</p>
    </div>
  );
}
