import type { VercelResponse } from "@vercel/node";
import qs from "qs";

import { endpoints } from "../../../util/endpoints";
import { fetcher } from "../__util/fetcher";
import { createCountQuery } from "../__util/query";

const endpoint = endpoints.casesCountryRegion;

const query = createCountQuery("OBJECTID");

export default async (_, res: VercelResponse) => {
	const response = await fetcher(`${endpoint}?${qs.stringify(query)}`);
	const data = await response.json();
	res.json(data);
};
