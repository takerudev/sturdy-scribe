import { Dispatch, useEffect, useState } from "react";
import { Entry } from "../models/Entry";
import { LorebookAction } from "../models/Lorebook";
import { transformKey } from "../models/utils";
import Form from "react-bootstrap/esm/Form";

/**
 * --- KeyInputControl ---
 *
 * TODO: Extract to independent component when adding key tag system.
 */

type KeyInputControlProps = {
  keyType: keyof Pick<Entry, "key" | "keysecondary">;
  entry: Entry;
  setEntry: Dispatch<React.SetStateAction<Entry>>;
  dispatch: Dispatch<LorebookAction>;
};

const KeyInputControl = (props: KeyInputControlProps) => {
  const { keyType, entry, setEntry, dispatch } = props;
  return (
    <Form.Group>
      <Form.Label>{keyType === "key" ? "Key" : "Secondary Key"}</Form.Label>
      <Form.Control
        as="textarea"
        rows={1}
        value={entry[keyType]}
        onChange={(e) =>
          setEntry({
            ...entry,
            [keyType]: transformKey(e.target.value),
          })
        }
        onBlur={(e) =>
          dispatch({
            type: "updateEntry",
            uid: entry.uid,
            property: keyType,
            value: transformKey(e.target.value),
          })
        }
      />
    </Form.Group>
  );
};

/**
 * --- EntryEditor ---
 *
 * Primary editor panel for entry content.
 * TODO: Break down to multiple components when introducing `@monaco-editor/react`.
 */

export type EntryEditorProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const EntryEditor = (props: EntryEditorProps) => {
  const { entry, dispatch } = props;
  const [localEntry, setLocalEntry] = useState<Entry>(entry);

  // Update local entry when source entry updates
  useEffect(() => {
    setLocalEntry(entry);
  }, [entry]);

  return (
    <>
      <KeyInputControl
        keyType="key"
        entry={localEntry}
        setEntry={setLocalEntry}
        dispatch={dispatch}
      />
      <KeyInputControl
        keyType="keysecondary"
        entry={localEntry}
        setEntry={setLocalEntry}
        dispatch={dispatch}
      />

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
        </Form.Group>
        <Form.Group>
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

export default EntryEditor;
