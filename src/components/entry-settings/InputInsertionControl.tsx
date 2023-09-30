import { Dispatch } from "react";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import Form from "react-bootstrap/Form";

/**
 * --- InputInsertionControl ---
 *
 * Handles different insertion types, i.e. Insertion Position.
 */

export type InputInsertionControlProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const InputInsertionControl = (props: InputInsertionControlProps) => {
  const { entry, dispatch } = props;
  return (
    <Form.Group>
      <Form.Label>Insertion Position</Form.Label>
      <Form.Select
        value={entry.position.toString()}
        onChange={(e) =>
          dispatch({
            type: "updateEntry",
            uid: entry.uid,
            property: "position",
            value: +e.target.value,
          })
        }
      >
        <option value="0">Before Defs</option>
        <option value="1">After Defs</option>
        <option value="2">Before AN</option>
        <option value="3">After AN</option>
      </Form.Select>
    </Form.Group>
  );
};

export default InputInsertionControl;
