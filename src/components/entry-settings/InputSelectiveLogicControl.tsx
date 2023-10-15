import { Entry, SelectiveLogic } from "../../models/Entry";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useLorebookContext } from "../contexts/LorebookContext";

/**
 * --- InputSelectiveLogicControl ---
 *
 * Handles the two different selection types for the secondary key, i.e. AND/NOT
 */

export type InputSelectiveLogicControlProps = {
  entry: Entry;
};

const InputSelectiveLogicControl = (props: InputSelectiveLogicControlProps) => {
  const { entry } = props;
  const { dispatch } = useLorebookContext();
  return (
    <div className="mt-3">
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
    </div>
  );
};

export default InputSelectiveLogicControl;
