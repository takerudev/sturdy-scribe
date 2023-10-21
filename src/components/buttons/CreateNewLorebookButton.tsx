import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa6";

import { createEmptyLorebookFile } from "../../services/fileService";

export type CreateNewLorebookButtonProps = Pick<ButtonProps, "className"> & {
  setFiles: Dispatch<SetStateAction<File[]>>;
  safe: boolean;
};

const CreateNewLorebookButton = (props: CreateNewLorebookButtonProps) => {
  const { setFiles, safe, className } = props;
  const [show, setShow] = useState(false);

  const setNewEmptyFile = () => {
    const file = createEmptyLorebookFile();
    setFiles([file]);
  };

  const handleClose = () => setShow(false);

  const handleOnClick = () => (!safe ? setShow(true) : setNewEmptyFile());

  return (
    <>
      <Button variant="secondary" className={className} onClick={handleOnClick}>
        <FaPlus />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <b>You are overwriting the current lorebook, are you sure?</b>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              handleClose();
              setNewEmptyFile();
            }}
          >
            Yes, overwrite
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Go back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNewLorebookButton;
