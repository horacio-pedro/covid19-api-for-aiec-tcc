import type { NowRequest, NowResponse } from "@now/node";
import { getEndpoint } from "../../util/endpoints";
import {
	fetchFeatures,
	attributeSpreader,
	normalizeKeys,
	matchCountryCode,
	getIso3Code,
} from "../../util/data";
import { queryDeaths } from "../../util/query";

export default async (request: NowRequest, response: NowResponse) => {
	const shouldGroupByCountryRegion = request.query.byCountry === "true";
	const endpoint = getEndpoint(
		shouldGroupByCountryRegion
			? "countryRegion"
			: (request.query.level as string),
	);
	const data = (await fetchFeatures(endpoint, queryDeaths()))
		.map(attributeSpreader)
		.map(normalizeKeys)
		.map(matchCountryCode)
		.map(getIso3Code);
	response.json([]);
};
