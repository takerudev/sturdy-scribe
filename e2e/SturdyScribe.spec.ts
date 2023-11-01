import { expect, Page, test } from "@playwright/test";

import { Position } from "../src/models/Entry";
import { Lorebook } from "../src/models/Lorebook";
import { lorebookSchema } from "../src/services/schemaService";
import {
  downloadLorebook,
  getDeltaLorebook,
  uploadLorebook,
} from "./common/helpers";

// TODO: test specs for editing textboxes and settings (and saving those changes)
// TODO: test specs for reordering entries and creating new ones
// TODO: test specs for searching entries and displaying appropriately
// TODO: test specs for reordering filtered entries

const checkSecondDeltaEntry = async (page: Page) => {
  await expect(page.getByLabel(/^Content$/)).toHaveValue("content");
  await expect(page.getByLabel(/^Comment$/)).toHaveValue("comment");
  await expect(page.getByLabel(/^Keys$/)).toHaveValue("key 1,key 2");
  await expect(page.getByLabel(/^Secondary Keys$/)).toHaveValue("key 3,key 4");
  await expect(
    page.getByLabel(/^Selective Logic Button for AND$/),
  ).not.toHaveClass(/active/);
  await expect(page.getByLabel(/^Selective Logic Button for NOT$/)).toHaveClass(
    /active/,
  );
  await expect(page.getByRole("combobox")).toHaveValue(
    Position.BEFORE_AN.toString(),
  );
  await expect(page.getByLabel(/^Constant/)).toBeChecked();
  await expect(page.getByLabel(/^Recursion/)).toBeChecked();
  await expect(page.getByLabel(/^Disable/)).toBeChecked();
  await expect(page.getByLabel(/^Probability slider$/)).toHaveValue("69");
  await expect(page.getByLabel(/^Probability input$/)).toHaveValue("69");
};

test.describe("SturdyScribe", () => {
  test("can render title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/^SturdyScribe$/);
  });

  test("can upload and render files", async ({ page }) => {
    await page.goto("/");
    await uploadLorebook(page);

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
    await checkSecondDeltaEntry(page);
  });
});

test.describe("Buttons", () => {
  test("can create a new lorebook", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel(/^Add entry$/)).toBeHidden();

    await page.getByLabel(/^Create lorebook$/).click();

    await expect(page.getByLabel(/^Add entry$/)).toBeVisible();
  });

  test("will warn user if overwriting an active lorebook", async ({ page }) => {
    await page.goto("/");
    await uploadLorebook(page);
    await page.getByLabel(/^Create lorebook$/).click();

    await expect(
      page.getByRole("button").getByText(/^Yes, overwrite$/),
    ).toBeEnabled();

    await page
      .getByRole("button")
      .getByText(/^Yes, overwrite$/)
      .click();

    await expect(page.getByRole("listitem")).toHaveCount(0);
  });

  test("can add new entries to an active lorebook", async ({ page }) => {
    await page.goto("/");
    await uploadLorebook(page);
    await expect(page.getByRole("listitem")).toHaveCount(2);

    await page.getByLabel(/^Add entry$/).click();

    await expect(page.getByRole("listitem")).toHaveCount(3);
  });

  test("can delete entries from an active lorebook", async ({ page }) => {
    await page.goto("/");
    await uploadLorebook(page);
    await expect(page.getByRole("listitem")).toHaveCount(2);

    await page.getByRole("listitem").first().click();
    await page.getByLabel(/^Delete entry$/).click();

    await expect(page.getByRole("listitem")).toHaveCount(1);
    await checkSecondDeltaEntry(page);
  });

  test("can download lorebooks to filesystem", async ({ page }) => {
    await page.goto("/");
    await uploadLorebook(page);

    const rawResultLorebook = await downloadLorebook(page);
    const resultLorebook: Lorebook = lorebookSchema.cast(rawResultLorebook);

    const rawExpectedLorebook = getDeltaLorebook();
    const expectedLorebook: Lorebook = lorebookSchema.cast(rawExpectedLorebook);
    expect(resultLorebook).toEqual(expectedLorebook);
  });
});
