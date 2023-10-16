import { lorebookSchema } from "../services/schemaService";
import * as yuki from "../samples/lorebook-samples/YUKIBOOK.json";
import { Lorebook } from "../models/Lorebook";
import { Entry, Position, SelectiveLogic } from "../models/Entry";

describe("schemaService", () => {
  it("should cast prototypical lorebook data successfully", () => {
    lorebookSchema.cast(yuki);
  });

  it("should cast and fill in missing lorebook data", () => {
    const lorebook: Lorebook = lorebookSchema.cast({
      entries: { "0": { uid: 0 } },
    });
    const entry: Entry = lorebook.entries[0];
    expect(entry.uid).toBe(0);
    expect(entry.key).toStrictEqual([]);
    expect(entry.keysecondary).toStrictEqual([]);
    expect(entry.content).toBe("");
    expect(entry.comment).toBe("");
    expect(entry.constant).toBe(false);
    expect(entry.selective).toBe(true);
    expect(entry.selectiveLogic).toBe(SelectiveLogic.AND);
    expect(entry.addMemo).toBe(true);
    expect(entry.order).toBe(100);
    expect(entry.position).toBe(Position.BEFORE_DEFS);
    expect(entry.disable).toBe(false);
    expect(entry.excludeRecursion).toBe(false);
    expect(entry.useProbability).toBe(true);
  });
});
