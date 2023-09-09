import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
// import lorebookRaw from "./schemas/lorebook-samples/lorebook-test.json";
import LorebookPanel from "./components/Lorebook";
import validateLorebook from "./utils/schemaHandler";
import { useCallback, useEffect, useState } from "react";
import { Lorebook } from "./types";

const App = () => {
  // TODO: Use this template for new lorebooks
  // const newEntryTemplate = {
  //   key: [],
  //   keysecondary: [],
  //   comment: "",
  //   content: "",
  //   constant: false,
  //   selective: true,
  //   selectiveLogic: 0,
  //   addMemo: false,
  //   order: 100,
  //   position: 0,
  //   disable: false,
  //   excludeRecursion: false,
  //   probability: 100,
  //   useProbability: true,
  // };

  const [files, setFiles] = useState<Array<File>>([]);
  const [lorebook, setLorebook] = useState<Lorebook>();

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      e.persist();
      for (const file of e.target.files ?? []) {
        if (file.type === "application/json") setFiles([file]);
      }
    },
    [],
  );

  const updateLorebook = useCallback(
    async (file: File) => {
      console.log("updateLorebook", files);
      const rawLorebook = JSON.parse(await file.text());
      setLorebook(validateLorebook(rawLorebook));
    },
    [files],
  );

  useEffect(() => {
    console.log("useEffect files", files);
    if (files.length > 0) updateLorebook(files[0]);
  }, [files, updateLorebook]);

  return (
    <Container>
      <Row>
        <Form>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Upload lorebook</Form.Label>
            <Form.Control type="file" size="lg" onChange={handleUpload} />
          </Form.Group>
        </Form>
      </Row>
      <Row>{lorebook && <LorebookPanel lorebook={lorebook} />}</Row>
    </Container>
  );
};

export default App;
