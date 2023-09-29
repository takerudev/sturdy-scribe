import ListGroup from "react-bootstrap/ListGroup";
import { Entry, SelectiveLogic } from "../types";
import { Dispatch, SetStateAction } from "react";

export type EntryListProps = {
  entries: Entry[];
  currentEntryId: number;
  setCurrentEntryId: Dispatch<SetStateAction<number>>;
};

const EntryList = (props: EntryListProps) => {
  const { entries, currentEntryId, setCurrentEntryId } = props;
  return (
    <>
      {entries && entries.length > 0 && (
        <ListGroup as="ul">
          {entries.flatMap((entry: Entry) => (
            <ListGroup.Item
              key={entry.uid}
              active={entry.uid === currentEntryId}
              onClick={() => setCurrentEntryId(entry.uid)}
            >
              {entry.uid} - [ {entry.key.join(" | ")} ] ---{" "}
              {SelectiveLogic[entry.selectiveLogic]} --- [{" "}
              {entry.keysecondary.join(" | ")} ]
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default EntryList;
