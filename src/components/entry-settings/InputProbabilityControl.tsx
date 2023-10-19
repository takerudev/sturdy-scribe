import { Entry } from "../../models/Entry";
import Form from "react-bootstrap/Form";
import { useLorebookContext } from "../contexts/LorebookContext";
import { Dispatch } from "react";

export type InputProbabilityControlProps = {
  entry: Entry;
  setEntry: Dispatch<React.SetStateAction<Entry>>;
};

const constrainProbabilityInput = (probability: number): number =>
  probability >= 100 ? 100 : probability <= 0 ? 0 : probability;

/**
 * Handles probability settings for an entry.
 */
const InputProbabilityControl = (props: InputProbabilityControlProps) => {
  const { entry, setEntry } = props;
  const { dispatch } = useLorebookContext();

  const setEntryUpdate = (value: number) =>
    setEntry({
      ...entry,
      probability: constrainProbabilityInput(value),
    });

  const dispatchEntryUpdate = (value: number) =>
    dispatch({
      type: "updateEntry",
      uid: entry.uid,
      property: "probability",
      value: constrainProbabilityInput(value),
    });

  return (
    <Form.Group>
      <Form.Label>Probability</Form.Label>
      <Form.Range
        aria-label="Probability slider"
        value={entry.probability}
        onChange={(e) => setEntryUpdate(e.target.valueAsNumber)}
        onMouseUp={(e) => dispatchEntryUpdate(e.currentTarget.valueAsNumber)}
      />
      <Form.Control
        type="number"
        aria-label="Probability input"
        value={entry.probability}
        onChange={(e) => setEntryUpdate(+e.target.value)}
        onBlur={(e) => dispatchEntryUpdate(+e.target.value)}
      />
    </Form.Group>
  );
};

export default InputProbabilityControl;
