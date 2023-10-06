import { Dispatch } from "react";
import { Entry, Position } from "../../models/Entry";
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
    <Form.Group className="mt-3">
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
        <option value={Position.BEFORE_DEFS}>Before Defs</option>
        <option value={Position.AFTER_DEFS}>After Defs</option>
        <option value={Position.BEFORE_AN}>Before AN</option>
        <option value={Position.AFTER_AN}>After AN</option>
      </Form.Select>
    </Form.Group>
  );
};

export default InputInsertionControl;
