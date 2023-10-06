import { useEffect, useState } from "react";
import { Entry } from "../../models/Entry";
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
};

const EntrySettingsEditor = (props: EntrySettingsEditorProps) => {
  const { entry } = props;
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
      />
      <InputSelectiveLogicControl entry={localEntry} />
      <InputKeyControl
        keyType="keysecondary"
        entry={localEntry}
        setEntry={setLocalEntry}
      />
      <InputInsertionControl entry={localEntry} />
      <hr />
      <InputBooleanControlGroup entry={localEntry} />
      <hr />
      <InputProbabilityControl entry={localEntry} />
    </>
  );
};

export default EntrySettingsEditor;
