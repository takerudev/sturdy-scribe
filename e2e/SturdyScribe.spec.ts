import { test, expect, FileChooser } from "@playwright/test";
import path from "path";
import { Position } from "../src/models/Entry";

// TODO: test specs for editing textboxes and settings (and saving correctly)
// TODO: test specs for reordering entries and creating new ones

test.describe("SturdyScribe", () => {
  test("can render title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SturdyScribe/);
  });

  /**
   * Loads a lorebook from file, then checks that all data has been rendered correctly.
   */
  test("can upload and render files", async ({ page }) => {
    // Create filechooser listener to upload lorebook file
    const pathToFile = path.join(
      __dirname,
      "../src/samples/lorebook-samples/delta_lorebook.json",
    );
    page.on(
      "filechooser",
      async (fileChooser: FileChooser) =>
        await fileChooser.setFiles(pathToFile),
    );

    // Goto page and start importing the lorebook
    await page.goto("/");
    await page.getByLabel("Import button").click();

    // Check entrylist rendering
    await expect(page.getByText("AND")).toHaveCount(1);
    await expect(page.getByText("NOT")).toHaveCount(1);

    // Check first entry
    await page.getByText("AND").first().click();
    await expect(page.getByLabel(/^Content$/)).toBeEmpty();
    await expect(page.getByLabel(/^Comment$/)).toBeEmpty();
    await expect(page.getByLabel(/^Keys$/)).toBeEmpty();
    await expect(page.getByLabel(/^Secondary Keys$/)).toBeEmpty();
    await expect(
      page.getByLabel(/^Selective Logic Button for AND$/),
    ).toHaveClass(/active/);
    await expect(
      page.getByLabel(/^Selective Logic Button for NOT$/),
    ).not.toHaveClass(/active/);
    await expect(page.getByRole("combobox")).toHaveValue(
      Position.BEFORE_DEFS.toString(),
    );
    await expect(page.getByLabel(/^Constant/)).not.toBeChecked();
    await expect(page.getByLabel(/^Recursion/)).not.toBeChecked();
    await expect(page.getByLabel(/^Disable/)).not.toBeChecked();
    await expect(page.getByLabel(/^Probability slider$/)).toHaveValue("100");
    await expect(page.getByLabel(/^Probability input$/)).toHaveValue("100");

    // Check second entry
    await page.getByText("NOT").first().click();
    await expect(page.getByLabel(/^Content$/)).toHaveValue("content");
    await expect(page.getByLabel(/^Comment$/)).toHaveValue("comment");
    await expect(page.getByLabel(/^Keys$/)).toHaveValue("key 1,key 2");
    await expect(page.getByLabel(/^Secondary Keys$/)).toHaveValue(
      "key 3,key 4",
    );
    await expect(
      page.getByLabel(/^Selective Logic Button for AND$/),
    ).not.toHaveClass(/active/);
    await expect(
      page.getByLabel(/^Selective Logic Button for NOT$/),
    ).toHaveClass(/active/);
    await expect(page.getByRole("combobox")).toHaveValue(
      Position.BEFORE_AN.toString(),
    );
    await expect(page.getByLabel(/^Constant/)).toBeChecked();
    await expect(page.getByLabel(/^Recursion/)).toBeChecked();
    await expect(page.getByLabel(/^Disable/)).toBeChecked();
    await expect(page.getByLabel(/^Probability slider$/)).toHaveValue("69");
    await expect(page.getByLabel(/^Probability input$/)).toHaveValue("69");
  });
});
