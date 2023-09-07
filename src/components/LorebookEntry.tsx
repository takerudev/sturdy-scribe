import { EntryData } from "../types";

export type LorebookEntryProps = {
  entry: EntryData;
};

const LorebookEntry = (props: LorebookEntryProps) => {
  const { entry } = props;
  return <p>{JSON.stringify(entry)}</p>;
};

export default LorebookEntry;
