import { getDailyCases } from "../util/api";
import * as fs from "node:fs";
import { promisify } from "node:util";
export async function daily() {
  try {
    const daily = await getDailyCases();
    const write = promisify(fs.writeFile);
    await write("cache/daily.json", JSON.stringify(daily));
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
}
