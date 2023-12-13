import { Dispatch } from "react";
import Form from "react-bootstrap/Form";

import { Entry } from "../../models/Entry";
import { useLorebookContext } from "../contexts/LorebookContext";

export type InputOrderControlProps = {
  entry: Entry;
  setEntry: Dispatch<React.SetStateAction<Entry>>;
};

/**
 * Handles probability settings for an entry.
 */
const InputOrderControl = (props: InputOrderControlProps) => {
  const { entry, setEntry } = props;
  const { dispatch } = useLorebookContext();

  const setEntryUpdate = (value: number) =>
    setEntry({
      ...entry,
      order: value,
    });

  const dispatchEntryUpdate = (value: number) =>
    dispatch({
      type: "updateEntry",
      uid: entry.uid,
      property: "order",
      value: value,
    });

  return (
    <Form.Group className="mt-3">
      <Form.Label>Order</Form.Label>
      <Form.Control
        type="number"
        aria-label="Order input"
        value={entry.order}
        onChange={(e) => setEntryUpdate(+e.target.value)}
        onBlur={(e) => dispatchEntryUpdate(+e.target.value)}
      />
    </Form.Group>
  );
};

export default InputOrderControl;
