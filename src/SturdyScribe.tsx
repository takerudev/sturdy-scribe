import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LorebookEditor from "./components/LorebookEditor";
import HeaderToolbar from "./components/HeaderToolbar";
import { lorebookSchema } from "./services/schemaService";
import { useCallback, useEffect, useState } from "react";
import { Lorebook } from "./models/Lorebook";
import { FaBookAtlas } from "react-icons/fa6";
import { LorebookContextProvider } from "./components/contexts/LorebookContext";

const SturdyScribe = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [lorebook, setLorebook] = useState<Lorebook>();

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
          <Col xs={4}>
            <HeaderToolbar lorebook={lorebook} setFiles={setFiles} />
          </Col>
        </Row>
        <Row>
          {lorebook ? (
            <LorebookContextProvider initialLorebook={lorebook}>
              <LorebookEditor sourceLorebook={lorebook} />
            </LorebookContextProvider>
          ) : (
            <p>Start a new lorebook or import an existing one.</p>
          )}
        </Row>
      </Col>
    </Container>
  );
};

export default SturdyScribe;
