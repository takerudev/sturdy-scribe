import { Dispatch } from "react";
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
  return (
    <FaTrash
      className={className}
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
