import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { FaFileLines } from "react-icons/fa6";

import { DEFAULT_FILENAME } from "../common/constants";
import { Entry } from "../models/Entry";
import { entriesOf, Lorebook } from "../models/Lorebook";
import { storeLorebook } from "../services/storeService";
import { useLorebookContext } from "./contexts/LorebookContext";
import EntryContentEditor from "./EntryContentEditor";
import EntryList from "./EntryList";
import EntrySettingsEditor from "./EntrySettingsEditor";
import HeaderToolbar from "./HeaderToolbar";

export type LorebookEditorProps = {
  sourceLorebook: Lorebook;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

/**
 * Contains primary UI and controls for all mutations to the lorebook model
 * TODO: Allow resizing width of the three main panels
 */
const LorebookEditor = (props: LorebookEditorProps) => {
  const { sourceLorebook, setFiles } = props;
  const { lorebook, dispatch } = useLorebookContext();
  const [currentEntryId, setCurrentEntryId] = useState<number>(-1);
  const [currentEntry, setCurrentEntry] = useState<Entry>();
  const [filename, setFilename] = useState<string>();

  // Load currentEntry data to reflect currentEntryId
  useEffect(() => {
    const newCurrentEntry = entriesOf(lorebook).find(
      (entry) => entry.uid === currentEntryId,
    );
    if (newCurrentEntry !== currentEntry) {
      setCurrentEntry(newCurrentEntry);
    }
  }, [currentEntry, currentEntryId, lorebook]);

  // Update lorebook state when new lorebook is selected or uploaded.
  useEffect(() => {
    dispatch({ type: "setLorebook", lorebook: sourceLorebook });
    setFilename(sourceLorebook?.filename ?? DEFAULT_FILENAME);
    setCurrentEntryId(-1);
  }, [dispatch, sourceLorebook]);

  // Persist lorebook in store when state is updated
  useEffect(() => {
    storeLorebook(lorebook);
  }, [lorebook]);

  return (
    <Row>
      <Col md={4}>
        <HeaderToolbar sourceLorebook={sourceLorebook} setFiles={setFiles} />
        <EntryList
          setCurrentEntryId={setCurrentEntryId}
          currentEntryId={currentEntryId}
        />
      </Col>

      <Col md={8}>
        <Row className="mb-2">
          {filename !== undefined && (
            <InputGroup>
              <InputGroup.Text>
                <FaFileLines />
              </InputGroup.Text>
              <Form.Control
                aria-label="filename input"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                onBlur={(e) =>
                  dispatch({
                    type: "setFilename",
                    filename: filename,
                  })
                }
              />
            </InputGroup>
          )}
        </Row>
        <Row>
          <Col md={8}>
            {currentEntry && <EntryContentEditor sourceEntry={currentEntry} />}
          </Col>
          <Col md={4}>
            {currentEntry && <EntrySettingsEditor entry={currentEntry} />}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LorebookEditor;
