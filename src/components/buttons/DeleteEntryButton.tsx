import { Dispatch, useState } from "react";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import { FaTrash } from "react-icons/fa6";
import { IconBaseProps } from "react-icons/lib";

export type DeleteEntryButtonProps = Pick<IconBaseProps, "className"> & {
  dispatch: Dispatch<LorebookAction>;
  entry: Entry;
};

const DeleteEntryButton = (props: DeleteEntryButtonProps) => {
  const { dispatch, entry, className } = props;
  const [hover, setHover] = useState<boolean>(false);

  return (
    <FaTrash
      className={className}
      color={hover ? "red" : ""}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>
        dispatch({
          type: "deleteEntry",
          uid: entry.uid,
        })
      }
    />
  );
};

export default DeleteEntryButton;
