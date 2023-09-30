import { Dispatch } from "react";
import { Form } from "react-bootstrap";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import { transformKey } from "../../models/utils";

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
  return (
    <Form.Group>
      <Form.Label>{keyType === "key" ? "Keys" : "Secondary Keys"}</Form.Label>
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
