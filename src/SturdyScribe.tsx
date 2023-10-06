import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import LorebookEditor from "./components/LorebookEditor";
import { lorebookSchema } from "./services/schemaService";
import { useCallback, useEffect, useState } from "react";
import { Lorebook } from "./models/Lorebook";
import { FaBookAtlas } from "react-icons/fa6";
import { LorebookContextProvider } from "./components/contexts/LorebookContext";

const SturdyScribe = () => {
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
      console.log("Files updated. Updating lorebook...", files);
      const rawLorebook = JSON.parse(await file.text());
      const validated = lorebookSchema.validateSync(rawLorebook, {
        abortEarly: false,
      });
      setLorebook(validated);
    },
    [files],
  );

  useEffect(() => {
    if (files.length > 0) updateLorebook(files[0]);
  }, [files, updateLorebook]);

  // === Render ===

  return (
    <Container>
      <Col>
        <hr />
        <Row>
          <h1>
            <FaBookAtlas /> SturdyScribe (early preview)
          </h1>
        </Row>
        <hr />
        <Row>
          <Form>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Control type="file" size="lg" onChange={handleUpload} />
            </Form.Group>
          </Form>
        </Row>
        <Row>
          {lorebook && (
            <LorebookContextProvider initialLorebook={lorebook}>
              <LorebookEditor sourceLorebook={lorebook} />
            </LorebookContextProvider>
          )}
        </Row>
      </Col>
    </Container>
  );
};

export default SturdyScribe;
