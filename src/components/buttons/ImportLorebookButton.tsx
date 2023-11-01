import { Dispatch, SetStateAction, useRef } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaFileImport } from "react-icons/fa6";

import { SturdyButtonProps } from "./types";

export type ImportLorebookButtonProps = SturdyButtonProps & {
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const ImportLorebookButton = (props: ImportLorebookButtonProps) => {
  const { setFiles, ...buttonProps } = props;
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of e.target.files ?? []) {
      if (file.type === "application/json") setFiles([file]);
    }
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Import Lorebook</Tooltip>}>
        <Button
          {...buttonProps}
          variant="outline-secondary"
          onClick={() => uploadButtonRef?.current?.click()}
          aria-label="Import button"
        >
          <FaFileImport className="mb-1" />
        </Button>
      </OverlayTrigger>

      {/* Sekrit input to get file safely */}
      <input
        ref={uploadButtonRef}
        type="file"
        onChange={handleUpload}
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </>
  );
};

export default ImportLorebookButton;
