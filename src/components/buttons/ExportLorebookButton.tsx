import Button from "react-bootstrap/Button";
import saveLorebook from "../../services/fileService";
import { FaFileExport } from "react-icons/fa6";
import { useLorebookContext } from "../contexts/LorebookContext";

const ExportLorebookButton = () => {
  const { lorebook } = useLorebookContext();

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
