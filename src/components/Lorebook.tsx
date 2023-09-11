import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { EntryWithContext, Lorebook } from "../types";
import LorebookEntry from "./LorebookEntry";
import { useState } from "react";

export type LorebookPanelProps = {
  lorebook: Lorebook;
  updateEntry: (_: EntryWithContext) => void;
};

const LorebookPanel = (props: LorebookPanelProps) => {
  const { lorebook, updateEntry } = props;
  const [activeKeys, setActiveKeys] = useState<Array<string>>([]);

  const toggleAccordionKey = (newKey: string) => {
    if (activeKeys.includes(newKey)) {
      setActiveKeys((keys) => keys.filter((key) => key !== newKey));
    } else {
      setActiveKeys((keys) => keys.concat(newKey));
    }
  };

  const toggleAllKeys = () => {
    if (activeKeys.length > 0) {
      setActiveKeys([]);
    } else {
      setActiveKeys(
        Object.values(lorebook.entries).flatMap((entry) =>
          entry.uid.toString(),
        ),
      );
    }
  };

  return (
    <>
      {lorebook && Object.keys(lorebook.entries).length > 0 && (
        <Button onClick={toggleAllKeys}>Open/Close all entries</Button>
      )}
      <Accordion alwaysOpen activeKey={activeKeys}>
        {Object.values(lorebook.entries).flatMap((entry) => (
          <Accordion.Item eventKey={entry.uid.toString()}>
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
