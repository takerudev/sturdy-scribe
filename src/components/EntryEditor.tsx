import { Entry } from "../types";

export type EntryEditorProps = {
  entry: Entry;
};

const EntryEditor = (props: EntryEditorProps) => {
  const { entry } = props;
  return <>{entry.content}</>;
};

export default EntryEditor;
