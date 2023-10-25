import store from "store2";

import { CONFIG_KEY, LOREBOOK_KEY } from "../common/constants";
import { entriesOf, Lorebook } from "../models/Lorebook";
import { SturdyConfig } from "../models/SturdyConfig";
import { lorebookSchema } from "./schemaService";

// --- Lorebook Store ---

export const storeLorebook = (lorebook: Lorebook) =>
  store.set(LOREBOOK_KEY, lorebook);

// TODO: consider decoupling from filling-in-by-default behaviour by making return type optional
export const getStoredLorebook = (): Lorebook =>
  lorebookSchema.cast(store.get(LOREBOOK_KEY) ?? { entries: [] });

// Checks if there a lorebook in storage
// TODO: Check if try-catch is even needed
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

// --- Config Store ---

export const storeConfig = (config: SturdyConfig) =>
  store.set(CONFIG_KEY, config);

export const getStoredConfig = (): SturdyConfig => store.get(CONFIG_KEY);
