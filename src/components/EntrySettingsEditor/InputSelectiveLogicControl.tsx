import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormGroupProps } from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";

import { Entry, SelectiveLogic } from "../../models/Entry";
import { useLorebookContext } from "../contexts/LorebookContext";

export type InputSelectiveLogicControlProps = FormGroupProps & {
  entry: Entry;
};

/**
 * Handles the two different selection types for the secondary key, i.e. AND/NOT
 */
const InputSelectiveLogicControl = (props: InputSelectiveLogicControlProps) => {
  const { entry, ...formGroupProps } = props;
  const { dispatch } = useLorebookContext();
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label>Selective Logic</Form.Label>
      <InputGroup>
        {[SelectiveLogic.AND, SelectiveLogic.NOT].flatMap((logic) => (
          <Button
            aria-label={"Selective Logic Button for " + SelectiveLogic[logic]}
            variant="secondary"
            key={logic}
            onClick={() =>
              dispatch({
                type: "updateEntry",
                uid: entry.uid,
                property: "selectiveLogic",
                value: logic,
              })
            }
            active={entry.selectiveLogic === logic}
          >
            {SelectiveLogic[logic]}
          </Button>
        ))}
      </InputGroup>
    </Form.Group>
  );
};

export default InputSelectiveLogicControl;
