import { Entry } from "../../models/Entry";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useLorebookContext } from "../contexts/LorebookContext";

export type InputBooleanControlGroupProps = {
  entry: Entry;
};

/**
 * Contains configurable boolean values for an entry.
 */
const InputBooleanControlGroup = (props: InputBooleanControlGroupProps) => {
  const { entry } = props;
  const { dispatch } = useLorebookContext();
  return (
    <Form.Group className="mt-3">
      <InputGroup>
        <Form.Check
          type="switch"
          aria-label="Constant checkbox"
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
        <Form.Label>Constant</Form.Label>
      </InputGroup>
      <InputGroup>
        <Form.Check
          type="switch"
          aria-label="Disable checkbox"
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
        <Form.Label>Disabled</Form.Label>
      </InputGroup>
      <InputGroup>
        <Form.Check
          type="switch"
          aria-label="Recursion checkbox"
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
        <Form.Label>Recursion</Form.Label>
      </InputGroup>
    </Form.Group>
  );
};

export default InputBooleanControlGroup;
