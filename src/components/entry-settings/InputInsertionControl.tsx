import { Entry, Position } from "../../models/Entry";
import Form from "react-bootstrap/Form";
import { useLorebookContext } from "../contexts/LorebookContext";

/**
 * --- InputInsertionControl ---
 *
 * Handles different insertion types, i.e. Insertion Position.
 */

export type InputInsertionControlProps = {
  entry: Entry;
};

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
