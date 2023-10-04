import Button from "react-bootstrap/Button";
import { Lorebook } from "../models/Lorebook";
import saveLorebook from "../services/fileService";

export type SaveLorebookButtonProps = {
  lorebook: Lorebook;
};

const SaveLorebookButton = (props: SaveLorebookButtonProps) => {
  const { lorebook } = props;

  const handleExportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("lorebook to save", lorebook);
    if (lorebook) saveLorebook(lorebook);
  };

  return <Button onClick={handleExportClick}>Export Lorebook to File</Button>;
};

export default SaveLorebookButton;
