import type { VercelRequest, VercelResponse } from "@vercel/node";

import {
	fetchFeatures,
	attributeSpreader,
	normalizeKeys,
	inferActive
} from "../../../util/data";
import { getEndpoint } from "../../../util/endpoints";
import { queryConfirmed } from "../../../util/query";
import { getCountryName } from "../../../util/countries";

export default async (req: VercelRequest, response: VercelResponse) => {
	try {
		const country = getCountryName(req.query.country as string);
		response.json(
			(
				await fetchFeatures(
					getEndpoint(
						country === "US" ? (req.query.level as string) : "county"
					),
					queryConfirmed(getCountryName(req.query.country as string))
				)
			)
				.map(attributeSpreader)
				.map(normalizeKeys)
				.map(inferActive)
		);
	} catch (error) {
		response.statusCode = 404;
		response.json([]);
	}
};
