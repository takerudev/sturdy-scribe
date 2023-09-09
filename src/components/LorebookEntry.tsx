import { EntryData } from "../types";

export type LorebookEntryProps = {
  entry: EntryData;
};

const LorebookEntry = (props: LorebookEntryProps) => {
  return <>{JSON.stringify(props.entry)}</>;
};

export default LorebookEntry;
