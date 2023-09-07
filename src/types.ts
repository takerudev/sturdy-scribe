export type EntryData = {
  key: Array<string>;
  keysecondary: Array<string>;
  comment: string;
  content: string;
  constant: boolean;
  selective: boolean;
  selectiveLogic: number;
  addMemo: boolean;
  order: number;
  position: number;
  disable: boolean;
  excludeRecursion: boolean;
  probability: number;
  useProbability: boolean;
};

export type EntryContext = {
  uid: number;
  displayIndex: number;
};

export type EntryWithContext = EntryData & EntryContext;

// N.B. Keys for 'entries' must be string form of consecutive integers for some reason.
export type Lorebook = {
  entries: Record<string, EntryWithContext>;
  originalData?: any;
};
