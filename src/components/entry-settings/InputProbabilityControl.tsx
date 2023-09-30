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

const constrainProbabilityInput = (probability: number): number =>
  probability >= 100 ? 100 : probability <= 0 ? 0 : probability;

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
            value: constrainProbabilityInput(e.target.valueAsNumber),
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
            value: constrainProbabilityInput(+e.target.value),
          })
        }
      />
    </Form.Group>
  );
};

export default InputProbabilityControl;
