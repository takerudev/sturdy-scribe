import { Lorebook } from "../types";
import LorebookEntry from "./LorebookEntry";

export type LorebookPanelProps = {
  lorebook: Lorebook;
};

const LorebookPanel = (props: LorebookPanelProps) => {
  return (
    <>
      {Object.values(props.lorebook.entries).flatMap((entry) => (
        <LorebookEntry entry={entry} />
      ))}
    </>
  );
};

export default LorebookPanel;
