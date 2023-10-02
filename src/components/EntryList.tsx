import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Dispatch, SetStateAction } from "react";
import { Entry, SelectiveLogic } from "../models/Entry";
import { LorebookAction } from "../models/Lorebook";

export type EntryListProps = {
  entries: Entry[];
  currentEntryId: number;
  setCurrentEntryId: Dispatch<SetStateAction<number>>;
  dispatch: Dispatch<LorebookAction>;
};

/**
 * Extract into component if custom title metadata is added later.
 */
const titleOf = (entry: Entry) => {
  const joinedKeys = entry.key.join(" | ");
  const joinedSecondaries = entry.keysecondary.join(" | ");
  const selectiveLogicString = SelectiveLogic[entry.selectiveLogic];
  return `${entry.uid} - [ ${joinedKeys} ] --- ${selectiveLogicString} --- [ ${joinedSecondaries} ]`;
};

/**
 * List of entries, select one to make it active.
 */
const EntryList = (props: EntryListProps) => {
  const { entries, currentEntryId, setCurrentEntryId, dispatch } = props;

  return (
    <>
      {entries && (
        <Button
          onClick={() =>
            dispatch({
              type: "newEntry",
            })
          }
        >
          Add
        </Button>
      )}
      {entries && entries.length > 0 && (
        <ListGroup as="ul">
          {entries.flatMap((entry: Entry) => (
            <ListGroup.Item
              key={entry.uid}
              active={entry.uid === currentEntryId}
              onClick={() => setCurrentEntryId(entry.uid)}
            >
              {titleOf(entry)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default EntryList;
