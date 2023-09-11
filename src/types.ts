import { InferType } from "yup";
import { entrySchema, lorebookSchema } from "./utils/schemaHandler";

// Deprecated
export type EntryData = {
  key: Array<string>;
  keysecondary: Array<string>;
  comment: string;
  content: string;
  constant: boolean;
  selective: boolean;
  selectiveLogic: number;
  addMemo: boolean;
  order: number;
  position: number;
  disable: boolean;
  excludeRecursion: boolean;
  probability: number;
  useProbability: boolean;
};

// Deprecated
export type EntryContext = {
  uid: number;
  displayIndex: number;
};

// Deprecated
export type EntryWithContext = EntryData & EntryContext;

// N.B. Keys for 'entries' must be string form of consecutive integers for some reason.
// Deprecated
export type LorebookOld = {
  entries: Record<string, EntryWithContext>;
  originalData?: any;
};

export type Entry = InferType<typeof entrySchema>;
export type Lorebook = InferType<typeof lorebookSchema>;

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
