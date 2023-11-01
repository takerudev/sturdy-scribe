import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { IconBaseProps } from "react-icons/lib";

import { Entry } from "../../models/Entry";
import { maxUid } from "../../models/Lorebook";
import { useLorebookContext } from "../contexts/LorebookContext";

export type DeleteEntryButtonProps = IconBaseProps & {
  entry: Entry;
};

const DeleteEntryButton = (props: DeleteEntryButtonProps) => {
  const { entry, ...iconProps } = props;
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
      {...iconProps}
      color={hover ? "red" : ""}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleDeleteEntryClick}
      aria-label="Delete entry"
    />
  );
};

export default DeleteEntryButton;
