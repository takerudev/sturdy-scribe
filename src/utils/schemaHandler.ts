import Ajv from "ajv";
import { Lorebook } from "../types";
import schema from "../schemas/lorebook-schema.json";

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
