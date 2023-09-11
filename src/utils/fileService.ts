import { saveAs } from "file-saver";
import { Lorebook } from "../types";

const saveLorebook = (lorebook: Lorebook) => {
  console.log("SAVING LOREBOOK", lorebook);
  const blob = new Blob([JSON.stringify(lorebook)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, "lorebook-test.json");
};

export default saveLorebook;
