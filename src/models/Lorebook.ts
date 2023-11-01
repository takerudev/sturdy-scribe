import { InferType } from "yup";

import { entrySchema, lorebookSchema } from "../services/schemaService";
import { Entry, EntryAttributeValue } from "./Entry";

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

// Creates a basic valid lorebook with a single empty entry.
export const getSkeletonLorebook = (): Lorebook =>
  castLorebook({
    entries: {
      "0": {
        uid: 0,
      },
    },
  });

// Casts an object to a lorebook. Will default to an empty lorebook if not present.
export const castLorebook = (lorebook: unknown | Lorebook): Lorebook =>
  lorebookSchema.cast(lorebook ?? { entries: {} });
