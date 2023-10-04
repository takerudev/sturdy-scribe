import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import LorebookEditor from "./components/LorebookEditor";
import { lorebookSchema } from "./services/schemaService";
import { useCallback, useEffect, useState } from "react";
import { Lorebook } from "./models/Lorebook";

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

  // === Render ===

  return (
    <Container fluid>
      <Row>
        <Form>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Upload lorebook</Form.Label>
            <Form.Control type="file" size="lg" onChange={handleUpload} />
          </Form.Group>
        </Form>
      </Row>
      <Row>{lorebook && <LorebookEditor sourceLorebook={lorebook} />}</Row>
    </Container>
  );
};

export default App;
