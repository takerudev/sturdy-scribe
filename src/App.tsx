import LorebookEntry from "./components/LorebookEntry";
import { Container } from "react-bootstrap";

const App = () => {
  const newEntryTemplate = {
    key: [],
    keysecondary: [],
    comment: "",
    content: "",
    constant: false,
    selective: true,
    selectiveLogic: 0,
    addMemo: false,
    order: 100,
    position: 0,
    disable: false,
    excludeRecursion: false,
    probability: 100,
    useProbability: true,
  };

  return (
    <Container>
      <LorebookEntry entry={newEntryTemplate} />
    </Container>
  );
};

export default App;
