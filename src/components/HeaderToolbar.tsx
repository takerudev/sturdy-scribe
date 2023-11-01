import { Dispatch, SetStateAction } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { Lorebook } from "../models/Lorebook";
import CreateNewLorebookButton from "./buttons/CreateNewLorebookButton";
import ExportLorebookButton from "./buttons/ExportLorebookButton";
import ImportLorebookButton from "./buttons/ImportLorebookButton";
import TitleTypeToggleButton from "./buttons/TitleTypeToggleButton";
import { useConfig } from "./contexts/SturdyConfigContext";

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
  const { config, setConfig } = useConfig();

  return (
    <ButtonToolbar className="mb-2 mt-2">
      <InputGroup>
        <CreateNewLorebookButton setFiles={setFiles} safe={!lorebook} />
        <ImportLorebookButton setFiles={setFiles} />
        <ExportLorebookButton />
        <TitleTypeToggleButton />
        <Form.Control
          placeholder="Search..."
          isValid={config.searchQuery.length > 0}
          onChange={(e) =>
            setConfig({
              ...config,
              searchQuery: e.target.value,
            })
          }
        />
      </InputGroup>
    </ButtonToolbar>
  );
};

export default HeaderToolbar;
