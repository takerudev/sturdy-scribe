import { Dispatch, createContext, useContext, useReducer } from "react";
import {
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
  initialLorebook: Lorebook;
};

export const LorebookContextProvider = (
  props: LorebookContextProviderProps,
) => {
  const { children, initialLorebook } = props;
  const [lorebook, dispatch] = useReducer(lorebookReducer, initialLorebook);
  return (
    <LorebookContext.Provider value={{ lorebook, dispatch }}>
      {children}
    </LorebookContext.Provider>
  );
};

export const useLorebookContext = () => useContext(LorebookContext);
