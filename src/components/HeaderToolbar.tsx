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
  sourceLorebook: Lorebook | undefined;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const HeaderToolbar = (props: HeaderToolbarProps) => {
  const { setFiles } = props;
  const { config, setConfig } = useConfig();

  return (
    <ButtonToolbar className="mb-2">
      <InputGroup>
        <CreateNewLorebookButton setFiles={setFiles} />
        <ImportLorebookButton setFiles={setFiles} />
        <ExportLorebookButton />
        <TitleTypeToggleButton />
        <Form.Control
          placeholder="Search..."
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
