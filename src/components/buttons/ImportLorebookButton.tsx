import { Dispatch, SetStateAction, useRef } from "react";
import Button from "react-bootstrap/Button";
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
      <Button
        {...buttonProps}
        variant="secondary"
        onClick={() => uploadButtonRef?.current?.click()}
        aria-label="Import button"
      >
        <FaFileImport />
      </Button>

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
