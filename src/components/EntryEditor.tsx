import { Dispatch, useEffect, useState } from "react";
import { Entry } from "../models/Entry";
import { LorebookAction } from "../models/Lorebook";
import Form from "react-bootstrap/esm/Form";

/**
 * --- KeyInputControl ---
 */

// type KeyInputControlProps = {
//   keyType: Pick<keyof Entry, ""
//   entry: Entry;
//   setLocalEntry: Dispatch<React.SetStateAction<Entry>>;
//   dispatch: Dispatch<LorebookAction>;
// }

// const KeyInputControl = (props: KeyInputControlProps) => (
//   <Form.Group>
//     <Form.Label>Secondary Keys</Form.Label>
//     <Form.Control
//       as="textarea"
//       rows={1}
//       value={props.entry.keysecondary}
//       onChange={(e) =>
//         props.setLocalEntry({
//           ...props.entry,
//           keysecondary: transformKey(e.target.value),
//         })
//       }
//       onBlur={(e) => {
//         dispatch({
//           type: "updateEntry",
//           uid: props.entry.uid,
//           property: "keysecondary",
//           value: transformKey(e.target.value),
//         })
//       }}
//     />
//   </Form.Group>
// );

/**
 * --- EntryEditor ---
 */

export type EntryEditorProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const transformKey = (raw: string): string[] =>
  raw.split(",").map((s: string) => s.trim());

const EntryEditor = (props: EntryEditorProps) => {
  const { entry, dispatch } = props;
  const [localEntry, setLocalEntry] = useState<Entry>(entry);

  /**
   * Update local entry when source entry updates
   */
  useEffect(() => {
    setLocalEntry(entry);
  }, [entry]);

  return (
    <>
      <Form.Group>
        <Form.Group>
          <Form.Label>Primary Keys</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            value={localEntry.key}
            onChange={(e) =>
              setLocalEntry({
                ...localEntry,
                keysecondary: transformKey(e.target.value),
              })
            }
            onBlur={(e) =>
              dispatch({
                type: "updateEntry",
                uid: localEntry.uid,
                property: "key",
                value: transformKey(e.target.value),
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Secondary Keys</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            value={localEntry.keysecondary}
            onChange={(e) =>
              setLocalEntry({
                ...localEntry,
                keysecondary: transformKey(e.target.value),
              })
            }
            onBlur={(e) => {
              dispatch({
                type: "updateEntry",
                uid: localEntry.uid,
                property: "keysecondary",
                value: transformKey(e.target.value),
              });
            }}
          />
        </Form.Group>
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
      </Form.Group>
      {JSON.stringify(entry)}
    </>
  );
};

export default EntryEditor;
