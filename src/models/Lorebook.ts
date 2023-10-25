import { InferType } from "yup";

import { entrySchema, lorebookSchema } from "../services/schemaService";
import { Entry, EntryAttributeValue } from "./Entry";

// TODO: expand local Lorebook type def
// TODO: wrap schema casting
// TODO: test prototype book is equivalent to local Lorebook type
export type Lorebook = InferType<typeof lorebookSchema>;

export type LorebookAction =
  | UpdateEntryAction
  | SwapEntryAction
  | NewEntryAction
  | DeleteEntryAction
  | SetLorebookAction;

export type UpdateEntryAction = {
  type: "updateEntry";
  uid: number;
  property: keyof Entry;
  value: EntryAttributeValue;
};

export type SwapEntryAction = {
  type: "swapEntry";
  uid1: number;
  uid2: number;
};

export type NewEntryAction = {
  type: "newEntry";
  uid: number;
};

export type DeleteEntryAction = {
  type: "deleteEntry";
  uid: number;
};

export type SetLorebookAction = {
  type: "setLorebook";
  lorebook: Lorebook;
};

/**
 * TODO: Add unit tests
 * TODO: Add Error types
 */
export const lorebookReducer = (state: Lorebook, action: LorebookAction) => {
  switch (action.type) {
    case "updateEntry":
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.uid]: {
            ...state.entries[action.uid],
            [action.property]: action.value,
          },
        },
      };

    case "swapEntry":
      const { uid1, uid2 } = action;
      if (validUids([uid1, uid2], state)) {
        const tempEntry1 = {
          ...state.entries[uid1],
          uid: uid2,
        };
        const tempEntry2 = {
          ...state.entries[uid2],
          uid: uid1,
        };
        return {
          ...state,
          entries: {
            ...state.entries,
            [uid2]: tempEntry1,
            [uid1]: tempEntry2,
          },
        };
      }
      throw new Error(
        `Cannot swap entries, bad uids: one of ${uid1} or ${uid2} not found in ${JSON.stringify(
          uidsOf(state),
        )}`,
      );

    case "newEntry":
      const newUid = action.uid;
      const rawEntry: Partial<Entry> = {
        uid: newUid,
      };
      return {
        ...state,
        entries: {
          ...state.entries,
          [newUid]: entrySchema.cast(rawEntry),
        },
      };

    case "deleteEntry":
      let newEntries = { ...state.entries };
      delete newEntries[action.uid];
      return {
        ...state,
        entries: newEntries,
      };

    case "setLorebook":
      return { ...action.lorebook };

    default:
      throw new Error("Unhandled action type");
  }
};

export const entriesOf = (lorebook: Lorebook): Entry[] =>
  Object.values(lorebook.entries);

export const uidsOf = (lorebook: Lorebook): number[] =>
  entriesOf(lorebook).flatMap((e) => e.uid);

export const validUids = (uids: number[], lorebook: Lorebook) =>
  uids.every((uid) => uidsOf(lorebook).includes(uid));

/**
 * @param {Lorebook} lorebook
 * @returns {number} maximum uid of entries in a lorebook, -1 if empty
 */
export const maxUid = (lorebook: Lorebook): number => {
  const entries = entriesOf(lorebook);
  return entries.length > 0
    ? entries.reduce((max: Entry, cur: Entry) =>
        max.uid < cur.uid ? cur : max,
      ).uid
    : -1;
};

export const getSkeletonLorebook = (): Lorebook =>
  lorebookSchema.cast({
    entries: {
      "0": {
        uid: 0,
      },
    },
  });
