import store from "store2";

import {
  castLorebook,
  getSkeletonLorebook,
  Lorebook,
} from "../models/Lorebook";
import { SturdyConfig } from "../models/SturdyConfig";
import { getStoredConfig, hasStoredLorebook } from "./storeService";

const setupStore = (
  storedValue: Lorebook | Partial<SturdyConfig> | null | undefined,
) =>
  jest
    .spyOn(store, "get")
    .mockImplementation(jest.fn().mockReturnValue(storedValue));

describe("config store", () => {
  it("should reset any searchQuery from stored config", () => {
    setupStore({ searchQuery: "old searchQuery" });
    const result = getStoredConfig();
    expect(result.searchQuery).toEqual("");
  });

  it("should handle a new user with no stored config", () => {
    setupStore(null);
    const result = getStoredConfig();
    expect(result.searchQuery).toEqual("");
    expect(result.titleType).toEqual("key");
  });

  it("should load a config with a non-default setting", () => {
    setupStore({ titleType: "comment" });
    const result = getStoredConfig();
    expect(result.titleType).toEqual("comment");
  });
});

describe("lorebook store", () => {
  describe("hasStoredLorebook", () => {
    it("should return true when lorebook in storage has at least one entry", () => {
      setupStore(getSkeletonLorebook());
      const result = hasStoredLorebook();
      expect(result).toBeTruthy();
    });

    it("should return false if lorebook in storage has no entries", () => {
      setupStore(castLorebook({ entries: {} }));
      const result = hasStoredLorebook();
      expect(result).toBeFalsy();
    });

    it("should return false if storage has no lorebook key", () => {
      setupStore(null);
      const result = hasStoredLorebook();
      expect(result).toBeFalsy();
    });
  });
});
