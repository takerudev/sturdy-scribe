import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LorebookEditor from "./components/LorebookEditor";
import saveLorebook from "./utils/fileService";
import { lorebookSchema } from "./utils/schemaHandler";
import { useCallback, useEffect, useState } from "react";
import { Entry, Lorebook } from "./types";

const App = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [lorebook, setLorebook] = useState<Lorebook>();

  // === Upload/Import ===

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const validated = lorebookSchema.validateSync(rawLorebook, {
        abortEarly: false,
      });
      setLorebook(validated);
    },
    [files],
  );

  useEffect(() => {
    console.log("useEffect files", files);
    if (files.length > 0) updateLorebook(files[0]);
  }, [files, updateLorebook]);

  // === Download/Export ===

  const handleExportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lorebook) saveLorebook(lorebook);
  };

  // === Child prop drilling (reducer) ===

  const updateEntry = (newEntry: Entry) => {
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
    <Container fluid>
      <Button onClick={handleExportClick}>Export Lorebook to File</Button>
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
          <LorebookEditor lorebook={lorebook} updateEntry={updateEntry} />
        )}
      </Row>
    </Container>
  );
};

export default App;
