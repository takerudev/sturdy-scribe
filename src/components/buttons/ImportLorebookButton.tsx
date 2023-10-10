import { Dispatch, SetStateAction, useRef } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import { FaFileImport } from "react-icons/fa6";

export type ImportLorebookButtonProps = Pick<ButtonProps, "className"> & {
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const ImportLorebookButton = (props: ImportLorebookButtonProps) => {
  const { setFiles } = props;
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of e.target.files ?? []) {
      if (file.type === "application/json") setFiles([file]);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => uploadButtonRef?.current?.click()}
      >
        <FaFileImport />
      </Button>

      {/* Sekrit input to get file safely */}
      <input
        ref={uploadButtonRef}
        type="file"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImportLorebookButton;
