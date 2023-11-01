import { Download, FileChooser, Page } from "@playwright/test";
import path from "path";
import streamToPromise from "stream-to-promise";

import { DELTA_LOREBOOK_FILEPATH } from "./constants";

export const uploadLorebook = async (page: Page) => {
  const pathToFile = path.join(__dirname, DELTA_LOREBOOK_FILEPATH);
  page.on(
    "filechooser",
    async (fileChooser: FileChooser) => await fileChooser.setFiles(pathToFile),
  );

  await page.getByLabel(/^Import button$/).click();
};

export const downloadLorebook = async (page: Page): Promise<object> => {
  const downloadPromise = new Promise<object>(async (resolve) => {
    page.on("download", async (download: Download) => {
      const readStream = await download.createReadStream();
      const downloadBuffer = await streamToPromise(readStream!);
      resolve(JSON.parse(downloadBuffer.toString()));
    });
  });
  await page.getByLabel(/^Export button$/).click();
  return downloadPromise;
};

export const getDeltaLorebook = () =>
  require(path.join(__dirname, DELTA_LOREBOOK_FILEPATH));

export const testDeltaLorebookFirstEntry = (page) => {};
