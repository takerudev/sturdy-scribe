import { Dispatch } from "react";
import { Entry } from "../../models/Entry";
import { transformKey } from "../../models/utils";
import Form from "react-bootstrap/Form";
import { useLorebookContext } from "../contexts/LorebookContext";

/**
 * --- InputKeyControl ---
 *
 * TODO: Add key tag handling system
 */

export type InputKeyControlProps = {
  keyType: keyof Pick<Entry, "key" | "keysecondary">;
  entry: Entry;
  setEntry: Dispatch<React.SetStateAction<Entry>>;
};

const InputKeyControl = (props: InputKeyControlProps) => {
  const { keyType, entry, setEntry } = props;
  const { dispatch } = useLorebookContext();
  const label = keyType === "key" ? "Keys" : "Secondary Keys";

  return (
    <Form.Group className="mt-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={1}
        value={entry[keyType]}
        onChange={(e) =>
          setEntry({
            ...entry,
            [keyType]: transformKey(e.target.value),
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
