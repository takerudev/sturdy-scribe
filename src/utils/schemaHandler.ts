import Ajv from "ajv";
import { Lorebook, Position, SelectiveLogic } from "../types";
import schema from "../schemas/lorebook-schema.json";
import { object, string, number, array, boolean, lazy } from "yup";

export const entrySchema = object({
  // indices
  uid: number().required(),
  displayIndex: number().required(),

  // activation keys
  key: array()
    .of(string().required())
    .default(() => [])
    .required(),
  keysecondary: array()
    .of(string().required())
    .default(() => [])
    .required(),

  // user content
  content: string().default(() => ""),
  comment: string().default(() => ""),

  // config
  constant: boolean()
    .default(() => false)
    .required(),
  selective: boolean()
    .default(() => true)
    .required(),
  selectiveLogic: number()
    .default(() => SelectiveLogic.AND)
    .required(),
  addMemo: boolean()
    .default(() => true)
    .required(),
  order: number()
    .default(() => 100)
    .required(),
  position: number()
    .default(() => Position.BEFORE_DEFS)
    .required(),
  disable: boolean()
    .default(() => false)
    .required(),
  excludeRecursion: boolean()
    .default(() => false)
    .required(),
  probability: number()
    .default(() => 100)
    .min(0)
    .max(100),
  useProbability: boolean()
    .default(() => true)
    .required(),
}).required();

// `yup` doesn't have a mapping schema type. This is a workaround utilising lazy validation. Lacks uniqueness checks.
export const lorebookSchema = object({
  entries: lazy((details) =>
    object(
      Object.fromEntries(Object.keys(details).map((key) => [key, entrySchema])),
    ),
  ),
});

// Deprecated
const validateLorebook = (lorebook: any): Lorebook | undefined => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(lorebook);
  if (valid) {
    return lorebook as Lorebook;
  } else {
    console.error(validate.errors);
  }
};

export default validateLorebook;
