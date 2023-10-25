import { createContext, Dispatch, useContext, useReducer } from "react";

import {
  getSkeletonLorebook,
  Lorebook,
  LorebookAction,
  lorebookReducer,
} from "../../models/Lorebook";
import { lorebookSchema } from "../../services/schemaService";

const LorebookContext = createContext<{
  lorebook: Lorebook;
  dispatch: Dispatch<LorebookAction>;
}>({
  lorebook: lorebookSchema.cast({ entries: {} }),
  dispatch: () => null,
});

export type LorebookContextProviderProps = {
  children: React.ReactNode;
};

export const LorebookContextProvider = (
  props: LorebookContextProviderProps,
) => {
  const { children } = props;
  const [lorebook, dispatch] = useReducer(
    lorebookReducer,
    getSkeletonLorebook(),
  );
  return (
    <LorebookContext.Provider value={{ lorebook, dispatch }}>
      {children}
    </LorebookContext.Provider>
  );
};

export const useLorebookContext = () => useContext(LorebookContext);
