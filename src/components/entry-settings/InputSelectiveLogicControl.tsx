import { Dispatch } from "react";
import { Entry, SelectiveLogic } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

/**
 * --- InputSelectiveLogicControl ---
 *
 * Handles the two different selection types for the secondary key, i.e. AND/NOT
 */

export type InputSelectiveLogicControlProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const InputSelectiveLogicControl = (props: InputSelectiveLogicControlProps) => {
  const { entry, dispatch } = props;
  return (
    <>
      <Form.Label>Selective Logic</Form.Label>
      <InputGroup>
        {[SelectiveLogic.AND, SelectiveLogic.NOT].flatMap((logic) => (
          <Button
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
    </>
  );
};

export default InputSelectiveLogicControl;
