import { lorebookSchema } from "../services/schemaService";
import { maxUid, type Lorebook, validUids, lorebookReducer } from "./Lorebook";
import * as yuki from "../samples/lorebook-samples/YUKIBOOK.json";

describe("maxUid", () => {
  it("should give the largest uid amongst entries in a lorebook", () => {
    const lorebook: Lorebook = lorebookSchema.cast(yuki);
    const result = maxUid(lorebook);
    expect(result).toEqual(4);
  });

  it("should give -1 if the lorebook is empty", () => {
    const lorebook: Lorebook = lorebookSchema.cast({ entries: {} });
    const result = maxUid(lorebook);
    expect(result).toEqual(-1);
  });
});

describe("validUids", () => {
  it("should find entry uids in a lorebook", () => {
    const lorebook: Lorebook = lorebookSchema.cast(yuki);
    const result = validUids([0, 1], lorebook);
    expect(result).toBeTruthy();
  });

  it("should not be able to find fake uids in a lorebook", () => {
    const lorebook: Lorebook = lorebookSchema.cast(yuki);
    const result = validUids([69], lorebook);
    expect(result).toBeFalsy();
  });
});

describe("lorebookReducer", () => {
  describe("swapEntry", () => {
    it("should swap two entries with no side effects", () => {
      const inputLorebook: Lorebook = lorebookSchema.cast({
        entries: {
          0: { uid: 0, content: "content 0" },
          1: { uid: 1, content: "content 1" },
          2: { uid: 2, content: "content 2" },
          3: { uid: 3, content: "content 3" },
        },
      });
      const expectedLorebook: Lorebook = lorebookSchema.cast({
        entries: {
          0: { uid: 0, content: "content 0" },
          1: { uid: 1, content: "content 2" },
          2: { uid: 2, content: "content 1" },
          3: { uid: 3, content: "content 3" },
        },
      });
      const result = lorebookReducer(inputLorebook, {
        type: "swapEntry",
        uid1: 1,
        uid2: 2,
      });
      expect(result).toEqual(expectedLorebook);
    });

    it("should do nothing if an entry swaps with itself", async () => {
      const lorebook: Lorebook = lorebookSchema.cast(yuki);
      const result = lorebookReducer(lorebook, {
        type: "swapEntry",
        uid1: 1,
        uid2: 1,
      });
      expect(result).toEqual(lorebook);
    });

    it("should throw when entries do not exist", () => {
      const lorebook: Lorebook = lorebookSchema.cast(yuki);
      expect(() =>
        lorebookReducer(lorebook, {
          type: "swapEntry",
          uid1: 0,
          uid2: 5000,
        }),
      ).toThrow();
    });
  });
});
