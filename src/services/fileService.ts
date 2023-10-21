import { saveAs } from "file-saver";

import { Lorebook } from "../models/Lorebook";
import { lorebookSchema } from "./schemaService";

export const saveLorebook = (lorebook: Lorebook) => {
  console.log("SAVING LOREBOOK", lorebook);
  const blob = new Blob([JSON.stringify(lorebook)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, "lorebook-test.json");
};

export const createEmptyLorebookFile = () =>
  new File(
    [JSON.stringify(lorebookSchema.cast({ entries: {} }))],
    "SturdyScribe_lorebook.json",
  );
