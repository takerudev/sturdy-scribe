import { useEffect, useState } from "react";

import { Entry } from "../../models/Entry";
import InputBooleanControlGroup from "./InputBooleanControlGroup";
import InputInsertionControl from "./InputInsertionControl";
import InputKeyControl from "./InputKeyControl";
import InputOrderControl from "./InputOrderControl";
import InputProbabilityControl from "./InputProbabilityControl";
import InputSelectiveLogicControl from "./InputSelectiveLogicControl";

export type EntrySettingsEditorProps = {
  entry: Entry;
};

/**
 * Editor panel for entry meta settings.
 */
const EntrySettingsEditor = (props: EntrySettingsEditorProps) => {
  const { entry } = props;
  const [localEntry, setLocalEntry] = useState<Entry>(entry);

  // Update local entry when source entry updates, this is the reload boundary for children.
  useEffect(() => {
    setLocalEntry(entry);
  }, [entry]);

  return (
    <div aria-label="Entry settings panel">
      <InputKeyControl
        keyType="key"
        entry={localEntry}
        setEntry={setLocalEntry}
        className="mb-3"
      />
      <InputSelectiveLogicControl entry={localEntry} className="mb-3" />
      <InputKeyControl
        keyType="keysecondary"
        entry={localEntry}
        setEntry={setLocalEntry}
        className="mb-3"
      />
      <InputInsertionControl entry={localEntry} />
      <hr />
      <InputBooleanControlGroup entry={localEntry} />
      <hr />
      <InputProbabilityControl entry={localEntry} setEntry={setLocalEntry} />
      <InputOrderControl entry={localEntry} setEntry={setLocalEntry} />
    </div>
  );
};

export default EntrySettingsEditor;
