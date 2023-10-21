import { Dispatch, SetStateAction } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import { Lorebook } from "../models/Lorebook";
import CreateNewLorebookButton from "./buttons/CreateNewLorebookButton";
import ImportLorebookButton from "./buttons/ImportLorebookButton";

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
      <ImportLorebookButton setFiles={setFiles} />
    </ButtonToolbar>
  );
};

export default HeaderToolbar;
