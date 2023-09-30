import { Dispatch, useEffect, useState } from "react";
import { Entry } from "../models/Entry";
import { LorebookAction } from "../models/Lorebook";
import KeyInputControl from "./KeyInputControl";

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

  // Update local entry when source entry updates
  useEffect(() => {
    setLocalEntry(entry);
  }, [entry]);

  return (
    <>
      <KeyInputControl
        keyType="key"
        entry={localEntry}
        setEntry={setLocalEntry}
        dispatch={dispatch}
      />
      <KeyInputControl
        keyType="keysecondary"
        entry={localEntry}
        setEntry={setLocalEntry}
        dispatch={dispatch}
      />
    </>
  );
};

export default EntrySettingsEditor;
