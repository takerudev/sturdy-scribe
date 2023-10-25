import { Dispatch, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaGlobe } from "react-icons/fa6";

import { createEmptyLorebookFile } from "../../services/fileService";
import { SturdyButtonProps } from "./types";

export type CreateNewLorebookButtonProps = SturdyButtonProps & {
  setFiles: Dispatch<SetStateAction<File[]>>;
  safe: boolean;
};

const CreateNewLorebookButton = (props: CreateNewLorebookButtonProps) => {
  const { setFiles, safe, ...buttonProps } = props;
  const [show, setShow] = useState(false);

  const setNewEmptyFile = () => {
    const file = createEmptyLorebookFile();
    setFiles([file]);
  };

  const handleClose = () => setShow(false);

  const handleOnClick = () => (!safe ? setShow(true) : setNewEmptyFile());

  return (
    <>
      <Button variant="secondary" {...buttonProps} onClick={handleOnClick}>
        <FaGlobe />
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
