import { createContext, Dispatch, useContext, useReducer } from "react";

import {
  castLorebook,
  getSkeletonLorebook,
  Lorebook,
  LorebookAction,
  lorebookReducer,
} from "../../models/Lorebook";

const LorebookContext = createContext<{
  lorebook: Lorebook;
  dispatch: Dispatch<LorebookAction>;
}>({
  lorebook: castLorebook(undefined),
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
