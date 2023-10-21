import Button, { ButtonProps } from "react-bootstrap/Button";
import { FaFileExport } from "react-icons/fa6";

import { saveLorebook } from "../../services/fileService";
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
    if (lorebook) saveLorebook(lorebook);
  };

  return (
    <Button
      onClick={handleExportClick}
      variant="secondary"
      className={className}
      disabled={disabled}
      aria-label="Export button"
    >
      <FaFileExport /> Save to file
    </Button>
  );
};

export default ExportLorebookButton;