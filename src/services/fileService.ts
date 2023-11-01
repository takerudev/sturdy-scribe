import { saveAs } from "file-saver";

import { castLorebook, Lorebook } from "../models/Lorebook";

export const saveLorebook = (lorebook: Lorebook) => {
  console.log("SAVING LOREBOOK", lorebook);
  const blob = new Blob([JSON.stringify(lorebook)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, "lorebook-test.json");
};

export const createEmptyLorebookFile = () =>
  new File(
    [JSON.stringify(castLorebook(undefined))],
    "SturdyScribe_lorebook.json",
  );
