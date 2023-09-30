import { InferType } from "yup";
import { Entry, EntryAttributeValue } from "./Entry";
import { lorebookSchema } from "../services/schemaService";

export type Lorebook = InferType<typeof lorebookSchema>;

export type LorebookAction = UpdateEntryAction | SetLorebookAction;

export type UpdateEntryAction = {
  type: "updateEntry";
  uid: number;
  property: keyof Entry;
  value: EntryAttributeValue;
};

export type SetLorebookAction = {
  type: "setLorebook";
  lorebook: Lorebook;
};

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

    case "setLorebook":
      return { ...action.lorebook };

    default:
      throw new Error("Unhandled action type");
  }
};

export const entriesOf = (lorebook: Lorebook): Entry[] =>
  Object.values(lorebook.entries);
