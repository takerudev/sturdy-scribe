import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Entry, Lorebook } from "../types";
import EntryList from "./EntryList";
import LorebookEntry from "./LorebookEntry";
import EntryEditor from "./EntryEditor";
import { entriesOf } from "../utils/utils";

export type LorebookEditorProps = {
  lorebook: Lorebook;
  updateEntry: (_: Entry) => void;
};

const LorebookEditor = (props: LorebookEditorProps) => {
  const { lorebook, updateEntry } = props;
  const [activeKeys, setActiveKeys] = useState<Array<string>>([]);

  const toggleAccordionKey = (newKey: string) =>
    activeKeys.includes(newKey)
      ? setActiveKeys((keys) => keys.filter((key) => key !== newKey))
      : setActiveKeys((keys) => keys.concat(newKey));

  const toggleAllKeys = () =>
    activeKeys.length > 0 ? collapseAll() : expandAll();

  const collapseAll = () => setActiveKeys([]);

  const expandAll = () =>
    setActiveKeys(entriesOf(lorebook).flatMap((entry) => entry.uid.toString()));

  // --- NEW METHODS ---

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

  return (
    <>
      {/* NEW EDITOR */}
      <>
        <Row>
          <Col xs={2}>
            <EntryList
              entries={entriesOf(lorebook)}
              setCurrentEntryId={setCurrentEntryId}
              currentEntryId={currentEntryId}
            />
          </Col>
          <Col xs={6}>
            {currentEntry && <EntryEditor entry={currentEntry} />}
          </Col>
          <Col xs={4}>bababooey</Col>
        </Row>
      </>

      {/* OLD EDITOR */}
      <>
        {lorebook && Object.keys(lorebook.entries).length > 0 && (
          <Button onClick={toggleAllKeys}>Open/Close all entries</Button>
        )}
        <Accordion alwaysOpen activeKey={activeKeys}>
          {entriesOf(lorebook).flatMap((entry) => (
            <Accordion.Item eventKey={entry.uid.toString()} key={entry.uid}>
              <Accordion.Header
                onClick={() => toggleAccordionKey(entry.uid.toString())}
              >
                {entry.key.join(" | ")} --- {entry.keysecondary.join(" | ")}
              </Accordion.Header>
              <Accordion.Body>
                <LorebookEntry entry={entry} updateEntry={updateEntry} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </>
    </>
  );
};

export default LorebookEditor;
