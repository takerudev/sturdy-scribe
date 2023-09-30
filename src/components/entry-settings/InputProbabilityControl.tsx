import { Dispatch } from "react";
import { Form } from "react-bootstrap";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";

/**
 * --- InputProbabilityControl ---
 *
 * Handles probability settings for an entry.
 */

export type InputProbabilityControlProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const InputProbabilityControl = (props: InputProbabilityControlProps) => {
  const { entry, dispatch } = props;
  return (
    <Form.Group>
      <Form.Label>Probability</Form.Label>
      <Form.Range
        value={entry.probability}
        onChange={(e) =>
          dispatch({
            type: "updateEntry",
            uid: entry.uid,
            property: "probability",
            value: e.target.valueAsNumber,
          })
        }
      />
      <Form.Control
        type="number"
        value={entry.probability}
        onChange={(e) =>
          dispatch({
            type: "updateEntry",
            uid: entry.uid,
            property: "probability",
            value: +e.target.value,
          })
        }
      />
    </Form.Group>
  );
};

export default InputProbabilityControl;
