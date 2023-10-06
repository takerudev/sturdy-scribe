import { useState } from "react";
import { Entry } from "../../models/Entry";
import { FaTrash } from "react-icons/fa6";
import { IconBaseProps } from "react-icons/lib";
import { useLorebookContext } from "../contexts/LorebookContext";

export type DeleteEntryButtonProps = Pick<IconBaseProps, "className"> & {
  entry: Entry;
};

const DeleteEntryButton = (props: DeleteEntryButtonProps) => {
  const { entry, className } = props;
  const { dispatch } = useLorebookContext();
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
