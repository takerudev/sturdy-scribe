import Button from "react-bootstrap/Button";
import { Lorebook } from "../../models/Lorebook";
import saveLorebook from "../../services/fileService";
import { FaFileExport } from "react-icons/fa6";

export type SaveLorebookButtonProps = {
  lorebook: Lorebook;
};

const ExportLorebookButton = (props: SaveLorebookButtonProps) => {
  const { lorebook } = props;

  const handleExportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("lorebook to save", lorebook);
    if (lorebook) saveLorebook(lorebook);
  };

  return (
    <Button onClick={handleExportClick} variant="secondary">
      <FaFileExport /> Export Lorebook
    </Button>
  );
};

export default ExportLorebookButton;
