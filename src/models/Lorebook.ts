import { InferType } from "yup";
import { Entry, EntryAttributeValue } from "./Entry";
import { entrySchema, lorebookSchema } from "../services/schemaService";

export type Lorebook = InferType<typeof lorebookSchema>;

export type LorebookAction =
  | UpdateEntryAction
  | NewEntryAction
  | DeleteEntryAction
  | SetLorebookAction;

export type UpdateEntryAction = {
  type: "updateEntry";
  uid: number;
  property: keyof Entry;
  value: EntryAttributeValue;
};

export type NewEntryAction = {
  type: "newEntry";
  uid: number;
};

export type DeleteEntryAction = {
  type: "deleteEntry";
  uid: number;
};

export type SetLorebookAction = {
  type: "setLorebook";
  lorebook: Lorebook;
};

/**
 * TODO: Add unit tests
 */
export const lorebookReducer = (state: Lorebook, action: LorebookAction) => {
  switch (action.type) {
    case "updateEntry":
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.uid]: {
            ...state.entries[action.uid],
            [action.property]: action.value,
          },
        },
      };

    case "newEntry":
      const newUid = action.uid;
      const rawEntry: Partial<Entry> = {
        uid: newUid,
      };
      return {
        ...state,
        entries: {
          ...state.entries,
          [newUid]: entrySchema.cast(rawEntry),
        },
      };

    case "deleteEntry":
      let newEntries = { ...state.entries };
      delete newEntries[action.uid];
      return {
        ...state,
        entries: newEntries,
      };

    case "setLorebook":
      return { ...action.lorebook };

    default:
      throw new Error("Unhandled action type");
  }
};

export const entriesOf = (lorebook: Lorebook): Entry[] =>
  Object.values(lorebook.entries);

/**
 * @param {Lorebook} lorebook
 * @returns {number} maximum uid of entries in a lorebook, -1 if empty
 */
export const maxUid = (lorebook: Lorebook): number => {
  const entries = entriesOf(lorebook);
  return entries.length > 0
    ? entries.reduce((max: Entry, cur: Entry) =>
        max.uid < cur.uid ? cur : max,
      ).uid
    : -1;
};
