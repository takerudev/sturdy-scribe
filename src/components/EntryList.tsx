import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Badge from "react-bootstrap/Badge";
import { Dispatch, SetStateAction } from "react";
import { Entry, SelectiveLogic } from "../models/Entry";
import {
  Lorebook,
  LorebookAction,
  entriesOf,
  maxUid,
} from "../models/Lorebook";
import SaveLorebookButton from "./SaveLorebookButton";

export type EntryListProps = {
  lorebook: Lorebook;
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
  return `[ ${joinedKeys} ] --- ${selectiveLogicString} --- [ ${joinedSecondaries} ]`;
};

/**
 * List of entries, select one to make it active.
 */
const EntryList = (props: EntryListProps) => {
  const { lorebook, currentEntryId, setCurrentEntryId, dispatch } = props;
  const entries = entriesOf(lorebook);

  return (
    <>
      {entries && <SaveLorebookButton lorebook={lorebook} />}
      {entries && (
        <Button
          onClick={() => {
            const newUid = maxUid(lorebook) + 1;
            dispatch({
              type: "newEntry",
              uid: newUid,
            });
            setCurrentEntryId(newUid);
          }}
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
              {entry.uid === currentEntryId && (
                <CloseButton
                  className="float-end"
                  onClick={() =>
                    dispatch({
                      type: "deleteEntry",
                      uid: entry.uid,
                    })
                  }
                />
              )}
              <Badge bg="secondary">
                <b>{entry.uid}</b>
              </Badge>
              <br />
              {titleOf(entry)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default EntryList;
