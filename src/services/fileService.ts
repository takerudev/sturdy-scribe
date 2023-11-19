import { saveAs } from "file-saver";

import { DEFAULT_FILENAME } from "../common/constants";
import { castLorebook, Lorebook } from "../models/Lorebook";

export const saveLorebook = (lorebook: Lorebook) => {
  console.log("SAVING LOREBOOK", lorebook);
  const { filename, ...lorebookData } = lorebook;
  const blob = new Blob([JSON.stringify(lorebookData)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, filename);
};

export const createEmptyLorebookFile = () =>
  new File([JSON.stringify(castLorebook(undefined))], DEFAULT_FILENAME);
