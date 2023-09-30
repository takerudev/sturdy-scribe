import { Dispatch } from "react";
import { Entry } from "../models/Entry";
import { LorebookAction } from "../models/Lorebook";

/**
 * --- EntryEditor ---
 *
 * Primary editor panel for entry content and comments.
 */

export type EntryContentEditorProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const EntryContentEditor = (props: EntryContentEditorProps) => {
  const { entry } = props;
  // const [localEntry, setLocalEntry] = useState<Entry>(entry);

  // // Update local entry when source entry updates
  // useEffect(() => {
  //   setLocalEntry(entry);
  // }, [entry]);

  return (
    <>
      {/* <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onBlur={handleOnBlurFor("content")}
          onChange={handleOnChangeWith(setContent)}
          rows={10} // TODO: adjust size dynamically, maybe under a toggle
          spellCheck
          wrap="hard"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          value={comment}
          onBlur={handleOnBlurFor("comment")}
          onChange={handleOnChangeWith(setComment)}
          rows={2}
          spellCheck
          wrap="hard"
        />
      </Form.Group> */}

      {/* <Form.Group>
          <Form.Label>Probability</Form.Label>
          <Form.Range
            value={probability}
            onBlur={handleOnBlurFor("probability")}
            onChange={handleOnChangeWith(setProbability)}
          />
          <Form.Control
            value={probability}
            type="number"
            onBlur={handleOnBlurFor("probability")}
            onChange={handleOnChangeWith(setProbability)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Group>
            <Form.Label>Constant</Form.Label>
            <Form.Check
              type="switch"
              checked={constant}
              onBlur={handleOnBlurFor("constant")}
              onChange={handleOnChangeWith(setConstant)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Disable</Form.Label>
            <Form.Check
              type="switch"
              checked={disable}
              onBlur={handleOnBlurFor("disable")}
              onChange={handleOnChangeWith(setDisable)}
            />
          </Form.Group>
        </Form.Group> */}
      {/* </Form.Group> */}
      {JSON.stringify(entry)}
    </>
  );
};

export default EntryContentEditor;
