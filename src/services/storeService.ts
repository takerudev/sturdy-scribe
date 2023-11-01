import store from "store2";

import { CONFIG_KEY, LOREBOOK_KEY } from "../common/constants";
import { castLorebook, entriesOf, Lorebook } from "../models/Lorebook";
import { SturdyConfig } from "../models/SturdyConfig";
import { configSchema } from "./schemaService";

// --- Lorebook Store ---

export const storeLorebook = (lorebook: Lorebook) =>
  store.set(LOREBOOK_KEY, lorebook);

export const getStoredLorebook = (): Lorebook =>
  castLorebook(store.get(LOREBOOK_KEY));

export const hasStoredLorebook = (): boolean =>
  entriesOf(getStoredLorebook()).length > 0;

// --- Config Store ---

export const storeConfig = (config: SturdyConfig) =>
  store.set(CONFIG_KEY, config);

export const getStoredConfig = (): SturdyConfig =>
  configSchema.cast({
    ...(store.get(CONFIG_KEY) ?? {}),
    searchQuery: "", // refresh searchQuery on load
  });
