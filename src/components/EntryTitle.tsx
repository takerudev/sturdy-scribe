import { Entry, SelectiveLogic } from "../models/Entry";
import { useConfig } from "./contexts/SturdyConfigContext";

const EntryTitle = (props: { entry: Entry }) => {
  const {
    config: { titleType },
  } = useConfig();
  const { entry } = props;

  if (titleType === "key") {
    const joinedKeys = entry.key.join(" | ");
    const joinedSecondaries = entry.keysecondary.join(" | ");
    const selectiveLogicString = SelectiveLogic[entry.selectiveLogic];
    return (
      <>
        <br />
        <p>
          [ {joinedKeys} ] --- {selectiveLogicString} --- [ {joinedSecondaries}{" "}
          ]
        </p>
      </>
    );
  } else {
    return <b> {entry.comment.length ? entry.comment : "---"}</b>;
  }
};

export default EntryTitle;
