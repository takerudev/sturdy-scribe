import { Dispatch, useEffect, useState } from "react";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import InputKeyControl from "./InputKeyControl";
import InputBooleanControlGroup from "./InputBooleanControlGroup";
import InputProbabilityControl from "./InputProbabilityControl";

/**
 * --- EntrySettingsEditor ---
 *
 * Editor panel for entry meta settings.
 */

export type EntrySettingsEditorProps = {
  entry: Entry;
  dispatch: Dispatch<LorebookAction>;
};

const EntrySettingsEditor = (props: EntrySettingsEditorProps) => {
  const { entry, dispatch } = props;
  const [localEntry, setLocalEntry] = useState<Entry>(entry);

  // Update local entry when source entry updates, this is the reload boundary for children.
  useEffect(() => {
    setLocalEntry(entry);
  }, [entry]);

  return (
    <>
      <InputKeyControl
        keyType="key"
        entry={localEntry}
        setEntry={setLocalEntry}
        dispatch={dispatch}
      />
      <InputKeyControl
        keyType="keysecondary"
        entry={localEntry}
        setEntry={setLocalEntry}
        dispatch={dispatch}
      />
      <InputBooleanControlGroup entry={localEntry} dispatch={dispatch} />
      <InputProbabilityControl entry={localEntry} dispatch={dispatch} />
    </>
  );
};

export default EntrySettingsEditor;
