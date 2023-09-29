import { Entry, Lorebook } from "../types";

export const entriesOf = (lorebook: Lorebook): Entry[] =>
  Object.values(lorebook.entries);
