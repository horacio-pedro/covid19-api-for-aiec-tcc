import type { NowResponse } from "@now/node";

import {
	getTotalConfirmed,
	getTotalRecovered,
	getTotalDeaths,
	getLastUpdate
} from "../util/api";

export default async (_, response: NowResponse) => {
	const [confirmed, recovered, deaths, lastUpdate] = await Promise.all([
		getTotalConfirmed(),
		getTotalRecovered(),
		getTotalDeaths(),
		getLastUpdate()
	]);

	response.json({
		confirmed: {
			value: confirmed,
			detail: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/confirmed"
		},
		recovered: {
			value: recovered,
			detail: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/recovered"
		},
		deaths: {
			value: deaths,
			detail: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/deaths"
		},
		dailySummary: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/daily",
		dailyTimeSeries: {
			pattern: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/daily/[dateString]",
			example: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/daily/2-14-2020"
		},
		image: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/og",
		source: "https://github.com/mathdroid/covid19",
		countries: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/countries",
		countryDetail: {
			pattern: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/countries/[country]",
			example: "https://covid19-api-for-aiec-tcc.134.255.177.30.sslip.io/api/countries/USA"
		},
		lastUpdate
	});
};
