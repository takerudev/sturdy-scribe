import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import LorebookPanel from "./components/Lorebook";
import validateLorebook from "./utils/schemaHandler";
import { useCallback, useEffect, useState } from "react";
import { EntryWithContext, Lorebook } from "./types";

const App = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [lorebook, setLorebook] = useState<Lorebook>();

  // === Upload ===

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

  // === Child prop drilling (ministrations) ===

  const updateEntry = (newEntry: EntryWithContext) => {
    console.log("CHANGING ENTRY", newEntry);
    const targetEntry = lorebook?.entries[newEntry.uid];
    if (targetEntry) {
      let newLorebook: Lorebook = structuredClone(lorebook);
      newLorebook.entries[newEntry.uid] = newEntry;
      setLorebook(newLorebook);
    }
  };

  // === Render ===

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
      <Row>
        {lorebook && (
          <LorebookPanel lorebook={lorebook} updateEntry={updateEntry} />
        )}
      </Row>
    </Container>
  );
};

export default App;
