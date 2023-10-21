import { InferType } from "yup";

import { entrySchema } from "../services/schemaService";

export type Entry = InferType<typeof entrySchema>;

export type EntryAttributeValue =
  | string
  | string[]
  | boolean
  | number
  | SelectiveLogic
  | Position;

export enum SelectiveLogic {
  AND = 0,
  NOT = 1,
}

export enum Position {
  BEFORE_DEFS = 0,
  AFTER_DEFS = 1,
  BEFORE_AN = 2,
  AFTER_AN = 3,
}

export type EntryAction = "updateEntry";

export const entryReducer = (
  state: Entry,
  action: {
    type: EntryAction;
    property: keyof Entry;
    value: EntryAttributeValue;
  },
): Entry => {
  switch (action.type) {
    case "updateEntry":
      return { ...state, [action.property]: action.value };
    default:
      throw new Error(`Unhandled action type`);
  }
};
