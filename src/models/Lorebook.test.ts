import { lorebookSchema } from "../services/schemaService";
import { maxUid, type Lorebook } from "./Lorebook";
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
