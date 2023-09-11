import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Lorebook } from "../types";
import LorebookEntry from "./LorebookEntry";
import { useState } from "react";

export type LorebookPanelProps = {
  lorebook: Lorebook;
};

const LorebookPanel = (props: LorebookPanelProps) => {
  const { lorebook } = props;
  const [activeKeys, setActiveKeys] = useState<Array<string>>([]);

  const toggleAccordionKey = (newKey: string) => {
    if (activeKeys.includes(newKey)) {
      setActiveKeys(activeKeys.filter((key) => key !== newKey));
    } else {
      setActiveKeys(activeKeys.concat(newKey));
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
              <LorebookEntry entry={entry} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default LorebookPanel;
