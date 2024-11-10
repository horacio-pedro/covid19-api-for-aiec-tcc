import type { VercelResponse } from "@vercel/node";

import {
	getTotalConfirmed,
	getTotalRecovered,
	getTotalDeaths,
	getLastUpdate
} from "../util/api";

export default async (_, response: VercelResponse) => {
	const [confirmed, recovered, deaths, lastUpdate] = await Promise.all([
		getTotalConfirmed(),
		getTotalRecovered(),
		getTotalDeaths(),
		getLastUpdate()
	]);

	response.json({
		confirmed: {
			value: confirmed,
			detail: "https://covid19-api-for-aiec-tcc.vercel.app/api/confirmed"
		},
		recovered: {
			value: recovered,
			detail: "https://covid19-api-for-aiec-tcc.vercel.app/api/recovered"
		},
		deaths: {
			value: deaths,
			detail: "https://covid19-api-for-aiec-tcc.vercel.app/api/deaths"
		},
		dailySummary: "https://covid19-api-for-aiec-tcc.vercel.app/api/daily",
		dailyTimeSeries: {
			pattern: "https://covid19-api-for-aiec-tcc.vercel.app/api/daily/[dateString]",
			example: "https://covid19-api-for-aiec-tcc.vercel.app/api/daily/2-14-2020"
		},
		image: "https://covid19-api-for-aiec-tcc.vercel.app/api/og",
		source: "https://github.com/mathdroid/covid19",
		countries: "https://covid19-api-for-aiec-tcc.vercel.app/api/countries",
		countryDetail: {
			pattern: "https://covid19-api-for-aiec-tcc.vercel.app/api/countries/[country]",
			example: "https://covid19-api-for-aiec-tcc.vercel.app/api/countries/USA"
		},
		lastUpdate
	});
};
