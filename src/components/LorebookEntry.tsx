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
  const [comment, setComment] = useState(entry.comment);
  const [keyPrimary, setKeyPrimary] = useState(entry.key);
  const [keySecondary, setKeySecondary] = useState(entry.keysecondary);
  const [constant, setConstant] = useState(entry.constant);
  const [disable, setDisable] = useState(entry.disable);

  useEffect(() => {
    setContent(entry.content);
    setComment(entry.comment);
    setKeyPrimary(entry.key);
    setKeySecondary(entry.keysecondary);
    setConstant(entry.constant);
    setDisable(entry.disable);
  }, [entry]);

  const castByProperty = (
    property: keyof Entry,
    value: any,
  ): string | string[] | boolean => {
    switch (property) {
      case "key":
      case "keysecondary":
        return value.split(",").map((s: string) => s.trim());
      default:
        return value;
    }
  };

  const parseValueFrom = (target: HTMLInputElement) =>
    target.checked !== undefined ? target.checked : target.value;

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
      const parsedValue = parseValueFrom(e.target);
      const newValue = castByProperty(property, parsedValue);
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
      setStateAction(parseValueFrom(e.target));

  return (
    <>
      <Form.Group>
        <Form.Group>
          <Form.Label>Primary Keys</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            value={keyPrimary}
            onBlur={handleOnBlurFor("key")}
            onChange={handleOnChangeWith(setKeyPrimary)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Secondary Keys</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
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
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            value={comment}
            onBlur={handleOnBlurFor("comment")}
            onChange={handleOnChangeWith(setComment)}
            rows={2}
            spellCheck
            wrap="hard"
          />
        </Form.Group>

        <Form.Group>
          <Form.Group>
            <Form.Label>Constant</Form.Label>
            <Form.Check
              type="switch"
              checked={constant}
              onBlur={handleOnBlurFor("constant")}
              onChange={handleOnChangeWith(setConstant)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Disable</Form.Label>
            <Form.Check
              type="switch"
              checked={disable}
              onBlur={handleOnBlurFor("disable")}
              onChange={handleOnChangeWith(setDisable)}
            />
          </Form.Group>
        </Form.Group>
      </Form.Group>
      {JSON.stringify(entry)}
    </>
  );
};

export default LorebookEntry;
