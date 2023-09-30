import { Dispatch, useEffect, useState } from "react";
import { Entry } from "../models/Entry";
import { LorebookAction } from "../models/Lorebook";
import Form from "react-bootstrap/Form";

/**
 * --- EntryContentEditor ---
 *
 * Primary editor panel for entry content and comments.
 * TODO: Adjust vertical line count dynamically, maybe under a clientside toggle.
 */

export type EntryContentEditorProps = {
  sourceEntry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const EntryContentEditor = (props: EntryContentEditorProps) => {
  const { sourceEntry, dispatch } = props;
  const [localEntry, setLocalEntry] = useState<Entry>(sourceEntry);

  // Update local entry when source entry updates, this is the reload boundary for children.
  useEffect(() => {
    setLocalEntry(sourceEntry);
  }, [sourceEntry]);

  return (
    <>
      {localEntry && (
        <>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              value={localEntry.content}
              onChange={(e) =>
                setLocalEntry({
                  ...localEntry,
                  content: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "updateEntry",
                  uid: localEntry.uid,
                  property: "content",
                  value: e.target.value,
                })
              }
              rows={10}
              spellCheck
              wrap="hard"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              value={localEntry.comment}
              onChange={(e) =>
                setLocalEntry({
                  ...localEntry,
                  comment: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "updateEntry",
                  uid: localEntry.uid,
                  property: "comment",
                  value: e.target.value,
                })
              }
              rows={2}
              spellCheck
              wrap="hard"
            />
          </Form.Group>
        </>
      )}

      <>{JSON.stringify(sourceEntry)}</>
    </>
  );
};

export default EntryContentEditor;
