import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Entry } from "../models/Entry";
import { entriesOf, Lorebook } from "../models/Lorebook";
import { storeLorebook } from "../services/storeService";
import { useLorebookContext } from "./contexts/LorebookContext";
import EntryContentEditor from "./EntryContentEditor";
import EntryList from "./EntryList";
import EntrySettingsEditor from "./EntrySettingsEditor";

export type LorebookEditorProps = {
  sourceLorebook: Lorebook;
};

/**
 * Contains primary UI and controls for all mutations to the lorebook model
 * TODO: Allow resizing width of the three main panels
 */
const LorebookEditor = (props: LorebookEditorProps) => {
  const { sourceLorebook } = props;
  const { lorebook, dispatch } = useLorebookContext();
  const [currentEntryId, setCurrentEntryId] = useState<number>(-1);
  const [currentEntry, setCurrentEntry] = useState<Entry>();

  // Load currentEntry data to reflect currentEntryId
  useEffect(() => {
    const newCurrentEntry = entriesOf(lorebook).find(
      (entry) => entry.uid === currentEntryId,
    );
    if (newCurrentEntry !== currentEntry) {
      setCurrentEntry(newCurrentEntry);
    }
  }, [currentEntry, currentEntryId, lorebook]);

  // Update lorebook when new lorebook is selected or uploaded.
  useEffect(() => {
    dispatch({ type: "setLorebook", lorebook: sourceLorebook });
    setCurrentEntryId(-1);
  }, [dispatch, sourceLorebook]);

  // Save lorebook to store when lorebook is updated
  useEffect(() => {
    storeLorebook(lorebook);
  }, [lorebook]);

  return (
    <>
      <Row>
        <Col md={4}>
          <EntryList
            setCurrentEntryId={setCurrentEntryId}
            currentEntryId={currentEntryId}
          />
        </Col>
        <Col md={6}>
          {currentEntry && <EntryContentEditor sourceEntry={currentEntry} />}
        </Col>
        <Col md={2}>
          {currentEntry && <EntrySettingsEditor entry={currentEntry} />}
        </Col>
      </Row>
    </>
  );
};

export default LorebookEditor;
