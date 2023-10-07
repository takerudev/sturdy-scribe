import { useState } from "react";
import { Entry } from "../../models/Entry";
import { FaTrash } from "react-icons/fa6";
import { IconBaseProps } from "react-icons/lib";
import { useLorebookContext } from "../contexts/LorebookContext";
import { maxUid } from "../../models/Lorebook";

export type DeleteEntryButtonProps = Pick<IconBaseProps, "className"> & {
  entry: Entry;
};

const DeleteEntryButton = (props: DeleteEntryButtonProps) => {
  const { entry, className } = props;
  const { lorebook, dispatch } = useLorebookContext();
  const [hover, setHover] = useState<boolean>(false);

  const handleDeleteEntryClick = () => {
    const finalId = maxUid(lorebook);
    const originId = entry.uid;

    for (let i = originId; i < finalId; i++) {
      dispatch({
        type: "swapEntry",
        uid1: i,
        uid2: i + 1,
      });
    }

    dispatch({
      type: "deleteEntry",
      uid: finalId,
    });
  };

  return (
    <FaTrash
      className={className}
      color={hover ? "red" : ""}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleDeleteEntryClick}
    />
  );
};

export default DeleteEntryButton;
