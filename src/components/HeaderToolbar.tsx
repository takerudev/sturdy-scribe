import { Dispatch, SetStateAction } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import CreateNewLorebookButton from "./buttons/CreateNewLorebookButton";
import ExportLorebookButton from "./buttons/ExportLorebookButton";
import { Lorebook } from "../models/Lorebook";
import ImportLorebookButton from "./buttons/ImportLorebookButton";

export type HeaderToolbarProps = {
  lorebook?: Lorebook;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const HeaderToolbar = (props: HeaderToolbarProps) => {
  const { lorebook, setFiles } = props;

  // TODO: Add hover text to buttons
  return (
    <ButtonToolbar className={"mb-2 mt-2"}>
      <CreateNewLorebookButton setFiles={setFiles} className={"me-1"} />
      <ExportLorebookButton className={"me-1"} disabled={!lorebook} />
      <ImportLorebookButton setFiles={setFiles} />
    </ButtonToolbar>
  );
};

export default HeaderToolbar;
