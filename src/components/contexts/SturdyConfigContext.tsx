import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { DEFAULT_CONFIG, SturdyConfig } from "../../models/SturdyConfig";
import { getStoredConfig, storeConfig } from "../../services/storeService";

const SturdyConfigContext = createContext<{
  config: SturdyConfig;
  setConfig: Dispatch<SetStateAction<SturdyConfig>>;
}>({
  config: DEFAULT_CONFIG,
  setConfig: () => null,
});

export const SturdyConfigContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [config, setConfig] = useState<SturdyConfig>(
    getStoredConfig() ?? DEFAULT_CONFIG,
  );

  useEffect(() => {
    storeConfig(config);
  }, [config]);

  return (
    <SturdyConfigContext.Provider value={{ config, setConfig }}>
      {props.children}
    </SturdyConfigContext.Provider>
  );
};

export const useConfig = () => useContext(SturdyConfigContext);
