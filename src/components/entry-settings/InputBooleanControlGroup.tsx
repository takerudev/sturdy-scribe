import { Dispatch } from "react";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import Form from "react-bootstrap/Form";

/**
 * --- InputBooleanControlGroup ---
 *
 * Contains the few configurable boolean values for entry settings.
 * Consider breaking into reusable component if complexity blows out. It's fine for now.
 */

export type InputBooleanControlGroupProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const InputBooleanControlGroup = (props: InputBooleanControlGroupProps) => {
  const { entry, dispatch } = props;
  return (
    <Form.Group>
      <Form.Group>
        <Form.Label>Constant</Form.Label>
        <Form.Check
          type="switch"
          checked={entry.constant}
          onChange={(e) =>
            dispatch({
              type: "updateEntry",
              uid: entry.uid,
              property: "constant",
              value: e.target.checked,
            })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Disabled</Form.Label>
        <Form.Check
          type="switch"
          checked={entry.disable}
          onChange={(e) =>
            dispatch({
              type: "updateEntry",
              uid: entry.uid,
              property: "disable",
              value: e.target.checked,
            })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Recursion</Form.Label>
        <Form.Check
          type="switch"
          checked={entry.excludeRecursion}
          onChange={(e) =>
            dispatch({
              type: "updateEntry",
              uid: entry.uid,
              property: "excludeRecursion",
              value: e.target.checked,
            })
          }
        />
      </Form.Group>
    </Form.Group>
  );
};

export default InputBooleanControlGroup;
