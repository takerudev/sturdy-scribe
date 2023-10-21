import Form from "react-bootstrap/Form";

import { Entry, Position } from "../../models/Entry";
import { useLorebookContext } from "../contexts/LorebookContext";

export type InputInsertionControlProps = {
  entry: Entry;
};

/**
 * Handles different insertion types, i.e. Insertion Position.
 */
const InputInsertionControl = (props: InputInsertionControlProps) => {
  const { entry } = props;
  const { dispatch } = useLorebookContext();
  return (
    <Form.Group className="mt-3">
      <Form.Label>Insertion Position</Form.Label>
      <Form.Select
        value={entry.position.toString()}
        aria-label="Insertion position"
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