import { useEffect, useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EntryList from "./EntryList";
import EntryContentEditor from "./EntryContentEditor";
import EntrySettingsEditor from "./entry-settings/EntrySettingsEditor";
import { Lorebook, entriesOf, lorebookReducer } from "../models/Lorebook";
import { lorebookSchema } from "../services/schemaService";
import { Entry } from "../models/Entry";

export type LorebookEditorProps = {
  sourceLorebook: Lorebook;
};

const LorebookEditor = (props: LorebookEditorProps) => {
  const { sourceLorebook } = props;
  const [lorebook, dispatch] = useReducer(
    lorebookReducer,
    lorebookSchema.cast(sourceLorebook),
  );
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
  }, [sourceLorebook]);

  return (
    <>
      <Row>
        <Col xs={4}>
          <EntryList
            lorebook={lorebook}
            setCurrentEntryId={setCurrentEntryId}
            currentEntryId={currentEntryId}
            dispatch={dispatch}
          />
        </Col>
        <Col xs={6}>
          {currentEntry && (
            <EntryContentEditor
              sourceEntry={currentEntry}
              dispatch={dispatch}
            />
          )}
        </Col>
        <Col xs={2}>
          {currentEntry && (
            <EntrySettingsEditor entry={currentEntry} dispatch={dispatch} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default LorebookEditor;
