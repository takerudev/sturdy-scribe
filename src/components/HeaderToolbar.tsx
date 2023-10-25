import { Dispatch, SetStateAction } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import { Lorebook } from "../models/Lorebook";
import CreateNewLorebookButton from "./buttons/CreateNewLorebookButton";
import ExportLorebookButton from "./buttons/ExportLorebookButton";
import ImportLorebookButton from "./buttons/ImportLorebookButton";
import TitleTypeToggleButton from "./buttons/TitleTypeToggleButton";

export type HeaderToolbarProps = {
  lorebook?: Lorebook;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

/**
 * Header containing some buttons relating to lorebook control.
 * TODO: Add hover text to buttons
 */
const HeaderToolbar = (props: HeaderToolbarProps) => {
  const { lorebook, setFiles } = props;

  return (
    <ButtonToolbar className="mb-2 mt-2">
      <CreateNewLorebookButton
        setFiles={setFiles}
        className="me-1"
        safe={!lorebook}
      />
      <ImportLorebookButton className="me-1" setFiles={setFiles} />
      <ExportLorebookButton className="me-1" />
      <TitleTypeToggleButton />
    </ButtonToolbar>
  );
};

export default HeaderToolbar;
