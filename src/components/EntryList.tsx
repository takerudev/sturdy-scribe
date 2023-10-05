import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { Dispatch, SetStateAction } from "react";
import { Entry, SelectiveLogic } from "../models/Entry";
import { Lorebook, LorebookAction, entriesOf } from "../models/Lorebook";
import ExportLorebookButton from "./buttons/ExportLorebookButton";
import AddEntryButton from "./buttons/AddEntryButton";
import DeleteEntryButton from "./buttons/DeleteEntryButton";

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
    entries && (
      <div className="d-grid gap-2">
        <ExportLorebookButton lorebook={lorebook} />
        <AddEntryButton
          lorebook={lorebook}
          dispatch={dispatch}
          setCurrentEntryId={setCurrentEntryId}
        />
        {entries.length > 0 && (
          <ListGroup as="ul">
            {entries.flatMap((entry: Entry) => (
              <ListGroup.Item
                key={entry.uid}
                active={entry.uid === currentEntryId}
                onClick={() => setCurrentEntryId(entry.uid)}
                variant="secondary"
              >
                {entry.uid === currentEntryId && (
                  <DeleteEntryButton
                    className="float-end"
                    dispatch={dispatch}
                    entry={entry}
                  />
                )}
                <Badge bg="dark">
                  <b>{entry.uid}</b>
                </Badge>
                <br />
                {titleOf(entry)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    )
  );
};

export default EntryList;
