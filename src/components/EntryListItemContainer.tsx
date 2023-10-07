import { memo, ReactNode, Dispatch, SetStateAction } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { useLorebookContext } from "./contexts/LorebookContext";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableContainer = memo(
  (props: { children: ReactNode; entryUid: number }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "entry",
      item: { uid: props.entryUid },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.8 : 1,
        isDragging: monitor.isDragging(),
      }),
    }));

    return <div ref={drag}>{!isDragging && props.children}</div>;
  },
);

const DroppableContainer = memo(
  (props: {
    children: ReactNode;
    uid: number;
    setCurrentEntryId: Dispatch<SetStateAction<number>>;
  }) => {
    const { dispatch } = useLorebookContext();
    const { uid, setCurrentEntryId, children } = props;
    const [{ itsSoOver }, drop] = useDrop({
      accept: "entry",
      drop: (item: { uid: number }, monitor) => {
        console.log(`dropped ${item.uid} on ${uid}`);
        const dragId = item.uid;
        const dropId = uid;

        // Don't do anything if nothing changes
        if (dragId === dropId) {
          return;
        }

        if (dropId < dragId) {
          // Shift entry down list (visually up)
          for (let i = dragId; i > dropId; i--) {
            dispatch({
              type: "swapEntry",
              uid1: i,
              uid2: i - 1,
            });
          }
          setCurrentEntryId(dropId);
        } else {
          // Shift entry up list (visually down)
          for (let i = dragId; i < dropId - 1; i++) {
            dispatch({
              type: "swapEntry",
              uid1: i,
              uid2: i + 1,
            });
          }
          setCurrentEntryId(dropId - 1);
        }
      },
      collect: (monitor) => ({
        itsSoOver: monitor.isOver(),
      }),
    });

    // Display empty space before children
    return (
      <div ref={drop}>
        {itsSoOver && <hr />}
        {children}
      </div>
    );
  },
);

export const EntryListItemProvider = (props: { children: ReactNode }) => (
  <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
);

export type EntryListItemContainerProps = {
  children: ReactNode;
  uid: number;
  setCurrentEntryId: Dispatch<SetStateAction<number>>;
};

const EntryListItemContainer = (props: EntryListItemContainerProps) => {
  const { uid, setCurrentEntryId, children } = props;
  return (
    <DroppableContainer uid={uid} setCurrentEntryId={setCurrentEntryId}>
      <DraggableContainer entryUid={uid}>{children}</DraggableContainer>
    </DroppableContainer>
  );
};

export default EntryListItemContainer;
