import { Entry } from "../../models/Entry";
import Form from "react-bootstrap/Form";
import { useLorebookContext } from "../contexts/LorebookContext";

/**
 * --- InputProbabilityControl ---
 *
 * Handles probability settings for an entry.
 */

export type InputProbabilityControlProps = {
  entry: Entry;
};

const constrainProbabilityInput = (probability: number): number =>
  probability >= 100 ? 100 : probability <= 0 ? 0 : probability;

const InputProbabilityControl = (props: InputProbabilityControlProps) => {
  const { entry } = props;
  const { dispatch } = useLorebookContext();
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
