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

export const downloadLorebook = async (page: Page): Promise<Download> => {
  const downloadPromise = new Promise<Download>(async (resolve) =>
    page.on("download", resolve),
  );
  await page.getByLabel(/^Export button$/).click();
  return downloadPromise;
};

export const handleDownloadedFile = async (
  download: Download,
): Promise<object> => {
  const readStream = await download.createReadStream();
  const downloadBuffer = await streamToPromise(readStream!);
  return JSON.parse(downloadBuffer.toString());
};

export const getDeltaLorebook = () =>
  require(path.join(__dirname, DELTA_LOREBOOK_FILEPATH));

export const testDeltaLorebookFirstEntry = (page) => {};
