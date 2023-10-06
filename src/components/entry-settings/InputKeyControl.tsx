import { Dispatch } from "react";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import { transformKey } from "../../models/utils";
import Form from "react-bootstrap/Form";

/**
 * --- InputKeyControl ---
 *
 * TODO: Add key tag handling system
 */

export type InputKeyControlProps = {
  keyType: keyof Pick<Entry, "key" | "keysecondary">;
  entry: Entry;
  setEntry: Dispatch<React.SetStateAction<Entry>>;
  dispatch: Dispatch<LorebookAction>;
};

const InputKeyControl = (props: InputKeyControlProps) => {
  const { keyType, entry, setEntry, dispatch } = props;
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
