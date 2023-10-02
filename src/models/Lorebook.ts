import { InferType } from "yup";
import { Entry, EntryAttributeValue } from "./Entry";
import { entrySchema, lorebookSchema } from "../services/schemaService";

export type Lorebook = InferType<typeof lorebookSchema>;

export type LorebookAction =
  | UpdateEntryAction
  | NewEntryAction
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
        displayIndex: newUid,
      };
      return {
        ...state,
        entries: {
          ...state.entries,
          [newUid]: entrySchema.cast(rawEntry),
        },
      };

    case "setLorebook":
      return { ...action.lorebook };

    default:
      throw new Error("Unhandled action type");
  }
};

export const entriesOf = (lorebook: Lorebook): Entry[] =>
  Object.values(lorebook.entries);

export const maxUid = (lorebook: Lorebook): number =>
  entriesOf(lorebook).reduce((max: Entry, cur: Entry) => {
    return max.uid < cur.uid ? cur : max;
  }).uid;
