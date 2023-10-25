import { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa6";

import { maxUid } from "../../models/Lorebook";
import { useLorebookContext } from "../contexts/LorebookContext";
import { SturdyButtonProps } from "./types";

export type AddEntryButtonProps = SturdyButtonProps & {
  setCurrentEntryId: Dispatch<SetStateAction<number>>;
};

const AddEntryButton = (props: AddEntryButtonProps) => {
  const { setCurrentEntryId, ...buttonProps } = props;
  const { lorebook, dispatch } = useLorebookContext();

  const handleAddEntryClick = () => {
    const newUid = maxUid(lorebook) + 1;
    dispatch({
      type: "newEntry",
      uid: newUid,
    });
    setCurrentEntryId(newUid);
  };

  return (
    <Button {...buttonProps} onClick={handleAddEntryClick} variant="secondary">
      <FaPlus className="mb-1" /> Add Entry
    </Button>
  );
};

export default AddEntryButton;
