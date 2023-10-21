import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FaBookAtlas } from "react-icons/fa6";
import store from "store2";

import { LOREBOOK_KEY } from "./common/constants";
import { LorebookContextProvider } from "./components/contexts/LorebookContext";
import HeaderToolbar from "./components/HeaderToolbar";
import LorebookEditor from "./components/LorebookEditor";
import { entriesOf, Lorebook } from "./models/Lorebook";
import { lorebookSchema } from "./services/schemaService";

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

  const loadLorebookFromStorage = () => {
    console.log("Loading lorebook from storage...");
    const storedData = store.get(LOREBOOK_KEY);
    const storedLorebook = lorebookSchema.cast(storedData);
    setLorebook(storedLorebook);
  };

  const hasOldSession = (): boolean => {
    try {
      if (store.has(LOREBOOK_KEY)) {
        const storedData = store.get(LOREBOOK_KEY);
        const storedLorebook = lorebookSchema.cast(storedData);
        return entriesOf(storedLorebook).length > 0;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

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
            <>
              <p>Start a new lorebook or import an existing one.</p>
              <br />
              {hasOldSession() && (
                <Col xs={4}>
                  <ButtonGroup>
                    <Button
                      variant="secondary"
                      onClick={loadLorebookFromStorage}
                    >
                      Restore previous session?
                    </Button>
                  </ButtonGroup>
                </Col>
              )}
            </>
          )}
        </Row>
      </Col>
    </Container>
  );
};

export default SturdyScribe;
