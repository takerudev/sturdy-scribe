import { EntryWithContext } from "../types";
import Form from "react-bootstrap/Form";

export type LorebookEntryProps = {
  entry: EntryWithContext;
  updateEntry: (_: EntryWithContext) => void;
};

const LorebookEntry = (props: LorebookEntryProps) => {
  const { entry, updateEntry } = props;

  const handleOnChange = (e: React.FocusEvent<HTMLInputElement>) => {
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
          defaultValue={entry.content}
          onBlur={handleOnChange}
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
