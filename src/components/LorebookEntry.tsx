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
  const [keyPrimary, setKeyPrimary] = useState(entry.key);
  const [keySecondary, setKeySecondary] = useState(entry.keysecondary);

  useEffect(() => {
    setContent(entry.content);
    setKeyPrimary(entry.key);
    setKeySecondary(entry.keysecondary);
  }, [entry]);

  const castByProperty = (
    property: keyof Entry,
    value: string,
  ): string | string[] => {
    switch (property) {
      case "key":
      case "keysecondary":
        return value.split(",").map((s) => s.trim());
      default:
        return value;
    }
  };

  /**
   * Function factory for Entry focus event handler.
   * Because `yup` doesn't infer all properties in a way that works well with TypeScript, we need to do some inference ourself to play nice.
   *
   * @param entryToUpdate
   * @param property
   * @returns an Entry event handler for mutation operations
   */
  const getEntryMutator =
    (entryToUpdate: Entry, property: keyof Entry) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      const newValue = castByProperty(property, e.target.value);
      return { ...entryToUpdate, [property]: newValue } as Entry;
    };

  const handleOnBlurFor =
    (property: keyof Entry) => (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value !== undefined) {
        const prepareNewEntry = getEntryMutator(entry, property);
        const newEntry = prepareNewEntry(e);
        updateEntry(newEntry);
      }
    };

  const handleOnChangeWith =
    (setStateAction: React.Dispatch<React.SetStateAction<any>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setStateAction(e.target.value);

  return (
    <>
      <Form.Group>
        <Form.Group>
          <Form.Label>Primary Keys</Form.Label>
          <Form.Control
            as="input"
            value={keyPrimary}
            onBlur={handleOnBlurFor("key")}
            onChange={handleOnChangeWith(setKeyPrimary)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Secondary Keys</Form.Label>
          <Form.Control
            as="input"
            value={keySecondary}
            onBlur={handleOnBlurFor("keysecondary")}
            onChange={handleOnChangeWith(setKeySecondary)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onBlur={handleOnBlurFor("content")}
            onChange={handleOnChangeWith(setContent)}
            rows={10} // TODO: adjust size dynamically, maybe under a toggle
            spellCheck
            wrap="hard"
          />
        </Form.Group>
      </Form.Group>
      {JSON.stringify(entry)}
    </>
  );
};

export default LorebookEntry;
