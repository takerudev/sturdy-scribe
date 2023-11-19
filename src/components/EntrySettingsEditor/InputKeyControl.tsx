import { Dispatch } from "react";
import Form from "react-bootstrap/Form";
import { FormGroupProps } from "react-bootstrap/FormGroup";

import { Entry } from "../../models/Entry";
import { useLorebookContext } from "../contexts/LorebookContext";

export type InputKeyControlProps = FormGroupProps & {
  keyType: keyof Pick<Entry, "key" | "keysecondary">;
  entry: Entry;
  setEntry: Dispatch<React.SetStateAction<Entry>>;
};

const transformKey = (raw: string): string[] =>
  raw.split(",").map((s: string) => s.trim());

/**
 * Handles Keys and Secondary Keys input
 * TODO: Add key tag handling system
 */
const InputKeyControl = (props: InputKeyControlProps) => {
  const { keyType, entry, setEntry, ...formGroupProps } = props;
  const { dispatch } = useLorebookContext();
  const label = keyType === "key" ? "Keys" : "Secondary Keys";

  return (
    <Form.Group {...formGroupProps}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        aria-label={label}
        rows={1}
        value={entry[keyType]}
        onChange={(e) =>
          setEntry({
            ...entry,
            [keyType]: [e.target.value],
          })
        }
        onBlur={(e) =>
          dispatch({
            type: "updateEntry",
            uid: entry.uid,
            property: keyType,
            value: transformKey(e.target.value),
          })
        }
      />
    </Form.Group>
  );
};

export default InputKeyControl;
