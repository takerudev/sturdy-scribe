import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EntryList from "./EntryList";
import EntryContentEditor from "./EntryContentEditor";
import EntrySettingsEditor from "./entry-settings/EntrySettingsEditor";
import { Lorebook, entriesOf } from "../models/Lorebook";
import { Entry } from "../models/Entry";
import { useLorebookContext } from "./contexts/LorebookContext";

export type LorebookEditorProps = {
  sourceLorebook: Lorebook;
};

/**
 * Lorebook Editor Component
 *
 * Contains UI and controls for all mutations to the lorebook model
 */
const LorebookEditor = (props: LorebookEditorProps) => {
  const { sourceLorebook } = props;
  const { lorebook, dispatch } = useLorebookContext();
  const [currentEntryId, setCurrentEntryId] = useState<number>(-1);
  const [currentEntry, setCurrentEntry] = useState<Entry>();

  /**
   * Keep currentEntry matched to currentEntryId
   */
  useEffect(() => {
    const newCurrentEntry = entriesOf(lorebook).find(
      (entry) => entry.uid === currentEntryId,
    );
    if (newCurrentEntry !== currentEntry) {
      setCurrentEntry(newCurrentEntry);
    }
  }, [currentEntry, currentEntryId, lorebook]);

  /**
   * Update lorebook when new lorebook is selected or uploaded.
   */
  useEffect(() => {
    dispatch({ type: "setLorebook", lorebook: sourceLorebook });
    setCurrentEntryId(-1);
  }, [dispatch, sourceLorebook]);

  return (
    <>
      <Row>
        <Col xs={4}>
          <EntryList
            setCurrentEntryId={setCurrentEntryId}
            currentEntryId={currentEntryId}
          />
        </Col>
        <Col xs={6}>
          {currentEntry && <EntryContentEditor sourceEntry={currentEntry} />}
        </Col>
        <Col xs={2}>
          {currentEntry && <EntrySettingsEditor entry={currentEntry} />}
        </Col>
      </Row>
    </>
  );
};

export default LorebookEditor;
