import Button, { ButtonProps } from "react-bootstrap/Button";
import { saveLorebook } from "../../services/fileService";
import { FaFileExport } from "react-icons/fa6";
import { useLorebookContext } from "../contexts/LorebookContext";

export type ExportLorebookButtonProps = Pick<
  ButtonProps,
  "className" | "disabled"
>;

const ExportLorebookButton = (props: ExportLorebookButtonProps) => {
  const { className, disabled } = props;
  const { lorebook } = useLorebookContext();

  const handleExportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("lorebook to save", lorebook);
    if (lorebook) saveLorebook(lorebook);
  };

  return (
    <Button
      onClick={handleExportClick}
      variant="secondary"
      className={className}
      disabled={disabled}
    >
      <FaFileExport />
    </Button>
  );
};

export default ExportLorebookButton;
