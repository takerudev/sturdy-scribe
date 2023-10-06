import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { Dispatch, SetStateAction } from "react";
import { Entry, SelectiveLogic } from "../models/Entry";
import { entriesOf } from "../models/Lorebook";
import ExportLorebookButton from "./buttons/ExportLorebookButton";
import AddEntryButton from "./buttons/AddEntryButton";
import DeleteEntryButton from "./buttons/DeleteEntryButton";
import { useLorebookContext } from "./contexts/LorebookContext";

export type EntryListProps = {
  currentEntryId: number;
  setCurrentEntryId: Dispatch<SetStateAction<number>>;
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
  const { currentEntryId, setCurrentEntryId } = props;
  const { lorebook } = useLorebookContext();
  const entries = entriesOf(lorebook);

  return (
    entries && (
      <div className="d-grid gap-2">
        <ExportLorebookButton />
        <AddEntryButton setCurrentEntryId={setCurrentEntryId} />
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
                  <DeleteEntryButton className="float-end" entry={entry} />
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
