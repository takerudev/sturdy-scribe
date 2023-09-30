import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Entry, EntryAttributeValue } from "../models/Entry";

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
  const [probability, setProbability] = useState(entry.probability);

  useEffect(() => {
    setContent(entry.content);
    setComment(entry.comment);
    setKeyPrimary(entry.key);
    setKeySecondary(entry.keysecondary);
    setConstant(entry.constant);
    setDisable(entry.disable);
    setProbability(entry.probability);
  }, [entry]);

  const propertyToStringArrayTransformer = (value: string) =>
    value.split(",").map((s: string) => s.trim());

  const propertyTransformers: {
    [K in keyof Entry]?: (value: string) => EntryAttributeValue;
  } = {
    key: propertyToStringArrayTransformer,
    keysecondary: propertyToStringArrayTransformer,
  };

  /**
   * We need to do this manual type inference because `yup` doesn't infer all properties in a way that works well with TypeScript when using `lazy`.
   */
  const castOrTransformValueByProperty = (
    property: keyof Entry,
    value: any,
  ): EntryAttributeValue => {
    const transformFunc = propertyTransformers[property];
    return transformFunc ? transformFunc(value) : value;
  };

  // N.B. Do not use nullish coalecense here; HTMLInputElement overload boolean `checked` to strings.
  const parseValueFrom = (target: HTMLInputElement): EntryAttributeValue => {
    switch (target.type) {
      case "switch":
        return target.checked;
      case "range":
        return target.valueAsNumber;
      default:
        return target.value;
    }
  };

  /**
   * Curried function factory to create an entry update handler for a specific property when focus events happen.
   */
  const getEntryFocusHandlerFor =
    (property: keyof Entry) => (e: React.FocusEvent<HTMLInputElement>) => {
      const parsedValue = parseValueFrom(e.target);
      const newValue = castOrTransformValueByProperty(property, parsedValue);
      return { ...entry, [property]: newValue } as Entry;
    };

  const handleOnBlurFor =
    (property: keyof Entry) => (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value !== undefined || e.target.checked !== undefined) {
        const handleFocus = getEntryFocusHandlerFor(property);
        const newEntry = handleFocus(e);
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
          <Form.Label>Probability</Form.Label>
          <Form.Range
            value={probability}
            onBlur={handleOnBlurFor("probability")}
            onChange={handleOnChangeWith(setProbability)}
          />
          <Form.Control
            value={probability}
            type="number"
            onBlur={handleOnBlurFor("probability")}
            onChange={handleOnChangeWith(setProbability)}
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
