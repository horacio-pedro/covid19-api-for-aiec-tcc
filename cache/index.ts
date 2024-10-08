import { daily } from "./daily";
import { og } from "./og";
import * as fs from "node:fs";
import { promisify } from "node:util";
import { format } from "date-fns";
(async () => {
  const [statusOg, statusDaily] = await Promise.all([og(), daily()]);

  const write = promisify(fs.writeFile);
  const writeReadme = `{
  "last_cron_date":"${format(new Date(), "cccc, dd LLLL yyyy HH:mm:ss")}",
  "og_cron_status":"${statusOg ? "success" : "error"}",
  "daily_cron_status":"${statusDaily ? "success" : "error"}"
  }`;
  await write("cache/status.json", writeReadme);
})();
