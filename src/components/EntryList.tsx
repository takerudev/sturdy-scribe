import { Dispatch, SetStateAction, useMemo } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { FaGrip } from "react-icons/fa6";

import { Entry } from "../models/Entry";
import { entriesOf } from "../models/Lorebook";
import AddEntryButton from "./buttons/AddEntryButton";
import DeleteEntryButton from "./buttons/DeleteEntryButton";
import { useLorebookContext } from "./contexts/LorebookContext";
import { useConfig } from "./contexts/SturdyConfigContext";
import EntryListItemContainer, {
  EntryListItemProvider,
} from "./EntryListItemContainer";
import EntryTitle from "./EntryTitle";

export type EntryListProps = {
  currentEntryId: number;
  setCurrentEntryId: Dispatch<SetStateAction<number>>;
};

/**
 * List of entries, select one to make it active. Drag and drop to reorder.
 */
const EntryListInner = (props: EntryListProps) => {
  const { currentEntryId, setCurrentEntryId } = props;
  const { lorebook } = useLorebookContext();
  const {
    config: { searchQuery },
  } = useConfig();

  const searchHitsText = (entries: Entry[]) =>
    `Showing ${entries.length} of ${entriesOf(lorebook).length} entries...`;

  // TODO: Add case-sensitive searching to config
  const searchableTextOf = (entry: Entry) =>
    (
      entry.content +
      entry.comment +
      entry.key.join(",") +
      entry.keysecondary.join(",")
    ).toLocaleLowerCase();

  // Filter entries by searchQuery
  const entries = useMemo(
    () =>
      searchQuery.length
        ? entriesOf(lorebook).filter((entry) =>
            searchableTextOf(entry).includes(searchQuery.toLocaleLowerCase()),
          )
        : entriesOf(lorebook),
    [lorebook, searchQuery],
  );

  return (
    entries && (
      <div className="d-grid gap-2">
        {searchQuery.length > 0 && searchHitsText(entries)}
        <AddEntryButton setCurrentEntryId={setCurrentEntryId} />
        {entries.length > 0 && (
          <ListGroup as="ul" role="list">
            {entries.flatMap((entry: Entry) => (
              <EntryListItemContainer
                key={entry.uid}
                uid={entry.uid}
                setCurrentEntryId={setCurrentEntryId}
              >
                <ListGroup.Item
                  role="listitem"
                  key={entry.uid}
                  active={entry.uid === currentEntryId}
                  onClick={() => setCurrentEntryId(entry.uid)}
                  variant="secondary"
                >
                  <FaGrip />{" "}
                  {entry.uid === currentEntryId && (
                    <DeleteEntryButton className="float-end" entry={entry} />
                  )}
                  <Badge bg="dark">
                    <b>{entry.uid}</b>
                  </Badge>
                  <EntryTitle entry={entry} />
                </ListGroup.Item>
              </EntryListItemContainer>
            ))}
          </ListGroup>
        )}
      </div>
    )
  );
};

// Context provider wrapper for EntryListInner
const EntryList = (props: EntryListProps) => (
  <EntryListItemProvider>
    <EntryListInner {...props} />
  </EntryListItemProvider>
);

export default EntryList;
