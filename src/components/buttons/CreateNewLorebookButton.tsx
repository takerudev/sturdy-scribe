import { Dispatch, SetStateAction } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa6";
import { createEmptyLorebookFile } from "../../services/fileService";

export type CreateNewLorebookButtonProps = Pick<ButtonProps, "className"> & {
  setFiles: Dispatch<SetStateAction<File[]>>;
};

// TODO: Ask for confirmation if overwriting existing lorebook

const CreateNewLorebookButton = (props: CreateNewLorebookButtonProps) => {
  const { setFiles, className } = props;

  const handleOnClick = () => {
    const file = createEmptyLorebookFile();
    setFiles([file]);
  };

  return (
    <Button variant="secondary" className={className} onClick={handleOnClick}>
      <FaPlus />
    </Button>
  );
};

export default CreateNewLorebookButton;
