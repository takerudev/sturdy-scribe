import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaFileExport } from "react-icons/fa6";

import { saveLorebook } from "../../services/fileService";
import { useLorebookContext } from "../contexts/LorebookContext";
import { SturdyButtonProps } from "./types";

export type ExportLorebookButtonProps = SturdyButtonProps;

const ExportLorebookButton = (props: ExportLorebookButtonProps) => {
  const { lorebook } = useLorebookContext();

  const handleExportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (lorebook) saveLorebook(lorebook);
  };

  return (
    <OverlayTrigger overlay={<Tooltip>Export Lorebook</Tooltip>}>
      <Button
        {...props}
        onClick={handleExportClick}
        variant="outline-secondary"
        aria-label="Export button"
      >
        <FaFileExport className="mb-1" />
      </Button>
    </OverlayTrigger>
  );
};

export default ExportLorebookButton;
