import { InferType } from "yup";
import { entrySchema, lorebookSchema } from "./utils/schemaHandler";

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
