import { Entry, Position, SelectiveLogic } from "../models/Entry";
import { Lorebook } from "../models/Lorebook";
import { SturdyConfig } from "../models/SturdyConfig";
import * as yuki from "../samples/lorebook-samples/YUKIBOOK.json";
import { configSchema, lorebookSchema } from "../services/schemaService";

describe("schemaService", () => {
  it("should cast an empty config correctly", () => {
    const config: SturdyConfig = configSchema.cast({});
    expect(config).not.toBeNull();
    expect(config.searchQuery).toEqual("");
    expect(config.titleType).toEqual("key");
  });

  it("should cast prototypical lorebook successfully", () => {
    expect(lorebookSchema.cast(yuki) as Lorebook).not.toBeNull();
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
