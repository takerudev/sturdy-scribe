import { Dispatch, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaGlobe } from "react-icons/fa6";

import { entriesOf } from "../../models/Lorebook";
import { createEmptyLorebookFile } from "../../services/fileService";
import { useLorebookContext } from "../contexts/LorebookContext";
import { SturdyButtonProps } from "./types";

export type CreateNewLorebookButtonProps = SturdyButtonProps & {
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const CreateNewLorebookButton = (props: CreateNewLorebookButtonProps) => {
  const { setFiles, ...buttonProps } = props;
  const { lorebook } = useLorebookContext();
  const [show, setShow] = useState(false);

  const setNewEmptyFile = () => {
    const file = createEmptyLorebookFile();
    setFiles([file]);
  };

  const handleClose = () => setShow(false);

  const handleOnClick = () =>
    entriesOf(lorebook).length > 0 ? setShow(true) : setNewEmptyFile();

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>New Lorebook</Tooltip>}>
        <Button
          {...buttonProps}
          aria-label="Create lorebook"
          variant="outline-secondary"
          onClick={handleOnClick}
        >
          <FaGlobe className="mb-1" />
        </Button>
      </OverlayTrigger>

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
