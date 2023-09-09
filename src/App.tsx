import { Container } from "react-bootstrap";
import lorebookRaw from "./schemas/lorebook-samples/lorebook-test.json";
import LorebookPanel from "./components/Lorebook";
import validateLorebook from "./utils/schemaHandler";

const App = () => {
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

  const lorebook = validateLorebook(lorebookRaw);

  return (
    <Container>{lorebook && <LorebookPanel lorebook={lorebook} />}</Container>
  );
};

export default App;
