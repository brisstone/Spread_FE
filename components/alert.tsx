import { useAlert } from "@/contexts/alert-context"
import { useEffect, useState } from "react";

export default function Alert() {
  const { alerts } = useAlert();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  }, [alerts]);

  return (
    <div className={`fixed top-4 right-4 p-3 ${show ? 'opacity-100' : 'opacity-0'} transition-opacity bg-red-400 rounded-lg`}>
      <p className="text-base text-white">{alerts[alerts.length - 1]}</p>
    </div>
  )
}