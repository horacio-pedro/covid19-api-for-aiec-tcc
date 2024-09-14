import { writeFile } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
const writeFileAsync = promisify(writeFile);

export async function writeTempFile(name: string, contents: string) {
  const fileName =
    `${createHash("md5")
      .update(name)
      .digest("hex")}.html`;
  const filePath = join(tmpdir(), fileName);
  await writeFileAsync(filePath, contents);
  return filePath;
}

export function pathToFileURL(path: string) {
  const fileUrl = `file://${path}`;
  return fileUrl;
}
