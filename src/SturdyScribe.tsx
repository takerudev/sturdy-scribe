import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FaBookAtlas } from "react-icons/fa6";

import { LorebookContextProvider } from "./components/contexts/LorebookContext";
import { SturdyConfigContextProvider } from "./components/contexts/SturdyConfigContext";
import HeaderToolbar from "./components/HeaderToolbar";
import LorebookEditor from "./components/LorebookEditor";
import { castLorebook, Lorebook } from "./models/Lorebook";
import { getStoredLorebook, hasStoredLorebook } from "./services/storeService";

const SturdyScribe = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [lorebook, setLorebook] = useState<Lorebook>();

  const updateLorebook = useCallback(
    async (file: File) => {
      console.log("Files updated. Updating lorebook...", files);
      const rawLorebook = JSON.parse(await file.text());
      const validated = castLorebook(rawLorebook);
      validated.filename = file.name;
      setLorebook(validated);
    },
    [files],
  );

  const loadLorebookFromStorage = () => {
    console.log("Loading lorebook from storage...");
    const storedLorebook = getStoredLorebook();
    setLorebook(storedLorebook);
  };

  useEffect(() => {
    if (files.length > 0) updateLorebook(files[0]);
  }, [files, updateLorebook]);

  return (
    <SturdyConfigContextProvider>
      <LorebookContextProvider>
        <Container>
          <hr />
          <Row>
            <h1>
              <FaBookAtlas className="mb-1" /> SturdyScribe (early preview)
            </h1>
          </Row>
          <hr />
          <Row>
            {lorebook ? (
              <LorebookEditor sourceLorebook={lorebook} setFiles={setFiles} />
            ) : (
              <>
                <Col md={4}>
                  <HeaderToolbar
                    sourceLorebook={lorebook}
                    setFiles={setFiles}
                  />
                </Col>
                {hasStoredLorebook() && (
                  <Col>
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
                <p>Start a new lorebook or import an existing one.</p>
              </>
            )}
          </Row>
        </Container>
      </LorebookContextProvider>
    </SturdyConfigContextProvider>
  );
};

export default SturdyScribe;
