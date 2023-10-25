// User config/preferences
export type SturdyConfig = {
  titleType: "key" | "comment";
};

// TODO: yup schema casting so that we can easily add new config keys in the future
export const DEFAULT_CONFIG: SturdyConfig = {
  titleType: "key",
};
