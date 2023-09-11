import { useEffect, useState } from "react";
import { Entry } from "../types";
import Form from "react-bootstrap/Form";

export type LorebookEntryProps = {
  entry: Entry;
  updateEntry: (_: Entry) => void;
};

const LorebookEntry = (props: LorebookEntryProps) => {
  const { entry, updateEntry } = props;
  const [content, setContent] = useState(entry.content);

  useEffect(() => setContent(entry.content), [entry, setContent]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newEntry = structuredClone(entry);
    newEntry.content = e.target.value;
    updateEntry(newEntry);
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          rows={10} // TODO: adjust size dynamically, maybe under a toggle
          spellCheck
          wrap="hard"
        />
      </Form.Group>
      {JSON.stringify(entry)}
    </>
  );
};

export default LorebookEntry;
