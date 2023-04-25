import { Props } from "@/types/props";
import { createContext, FC, useContext, useState } from "react";

const useTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return { tabIndex, setTabIndex };
}

export default useTab;