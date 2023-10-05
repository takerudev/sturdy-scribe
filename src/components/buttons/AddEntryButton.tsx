import { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa6";
import { Lorebook, LorebookAction, maxUid } from "../../models/Lorebook";

export type AddEntryButtonProps = {
  lorebook: Lorebook;
  dispatch: Dispatch<LorebookAction>;
  setCurrentEntryId: Dispatch<SetStateAction<number>>;
};

const AddEntryButton = (props: AddEntryButtonProps) => {
  const { lorebook, dispatch, setCurrentEntryId } = props;

  const handleAddEntryClick = () => {
    const newUid = maxUid(lorebook) + 1;
    dispatch({
      type: "newEntry",
      uid: newUid,
    });
    setCurrentEntryId(newUid);
  };

  return (
    <Button onClick={handleAddEntryClick} variant="secondary">
      <FaPlus /> Add Entry
    </Button>
  );
};

export default AddEntryButton;
