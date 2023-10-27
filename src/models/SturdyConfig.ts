import { InferType } from "yup";

import { configSchema } from "../services/schemaService";

export type SturdyConfig = InferType<typeof configSchema>;

export const DEFAULT_CONFIG: SturdyConfig = {
  titleType: "key",
  searchQuery: "",
};
