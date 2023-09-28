import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Entry, Lorebook } from "../types";
import LorebookEntry from "./LorebookEntry";
import { useState } from "react";

export type LorebookPanelProps = {
  lorebook: Lorebook;
  updateEntry: (_: Entry) => void;
};

const LorebookPanel = (props: LorebookPanelProps) => {
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
    setActiveKeys(
      Object.values(lorebook.entries).flatMap((entry) => entry.uid.toString()),
    );

  return (
    <>
      {lorebook && Object.keys(lorebook.entries).length > 0 && (
        <Button onClick={toggleAllKeys}>Open/Close all entries</Button>
      )}
      <Accordion alwaysOpen activeKey={activeKeys}>
        {Object.values(lorebook.entries).flatMap((entry) => (
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
  );
};

export default LorebookPanel;
