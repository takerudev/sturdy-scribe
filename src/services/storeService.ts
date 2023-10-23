import store from "store2";

import { LOREBOOK_KEY } from "../common/constants";
import { entriesOf, Lorebook } from "../models/Lorebook";
import { lorebookSchema } from "./schemaService";

export const storeLorebook = (lorebook: Lorebook) =>
  store.set(LOREBOOK_KEY, lorebook);

export const getStoredLorebook = (): Lorebook =>
  lorebookSchema.cast(store.get(LOREBOOK_KEY) ?? { entries: [] });

// Checks if there a lorebook in storage
export const hasStoredLorebook = (): boolean => {
  try {
    if (store.has(LOREBOOK_KEY)) {
      const storedData = store.get(LOREBOOK_KEY);
      const storedLorebook = lorebookSchema.cast(storedData);
      return entriesOf(storedLorebook).length > 0;
    }
  } catch (e) {
    console.error(e);
  }
  return false;
};
