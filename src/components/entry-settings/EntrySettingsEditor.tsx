import { Dispatch, useEffect, useState } from "react";
import { Entry } from "../../models/Entry";
import { LorebookAction } from "../../models/Lorebook";
import InputKeyControl from "./InputKeyControl";
import InputBooleanControlGroup from "./InputBooleanControlGroup";
import InputProbabilityControl from "./InputProbabilityControl";
import InputInsertionControl from "./InputInsertionControl";
import InputSelectiveLogicControl from "./InputSelectiveLogicControl";

/**
 * --- EntrySettingsEditor ---
 *
 * Editor panel for entry meta settings.
 * TODO: Extract entry/dispatch into provider hook.
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
      <InputSelectiveLogicControl entry={localEntry} dispatch={dispatch} />
      <InputKeyControl
        keyType="keysecondary"
        entry={localEntry}
        setEntry={setLocalEntry}
        dispatch={dispatch}
      />
      <InputInsertionControl entry={localEntry} dispatch={dispatch} />
      <hr />
      <InputBooleanControlGroup entry={localEntry} dispatch={dispatch} />
      <hr />
      <InputProbabilityControl entry={localEntry} dispatch={dispatch} />
    </>
  );
};

export default EntrySettingsEditor;
