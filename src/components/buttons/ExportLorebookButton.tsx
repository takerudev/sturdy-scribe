import Button, { ButtonProps } from "react-bootstrap/Button";
import { saveLorebook } from "../../services/fileService";
import { FaFileExport } from "react-icons/fa6";
import { useLorebookContext } from "../contexts/LorebookContext";

export type ExportLorebookButtonProps = Pick<
  ButtonProps,
  "className" | "disabled"
>;

// TODO: Fix broken export >:c

const ExportLorebookButton = (props: ExportLorebookButtonProps) => {
  const { className, disabled } = props;
  const { lorebook } = useLorebookContext();

  const handleExportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (lorebook) saveLorebook(lorebook);
  };

  return (
    <Button
      onClick={handleExportClick}
      variant="secondary"
      className={className}
      disabled={disabled}
    >
      <FaFileExport /> Save to file
    </Button>
  );
};

export default ExportLorebookButton;
