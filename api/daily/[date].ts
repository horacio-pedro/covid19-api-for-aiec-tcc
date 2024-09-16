import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "isomorphic-unfetch";
import { parse } from "csv-parse/sync";
import { normalizeKeys } from "../../util/data";

const getRequestDate = (date: Date) => {
	const [yyyy, mm, dd] = date.toISOString().split("T")[0].split("-");
	return `${mm}-${dd}-${yyyy}`;
};

const fetchCSVByDate = async (date: Date) => {
	const requestDate = getRequestDate(date);
	const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${requestDate}.csv`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch CSV: ${response.statusText}`);
	}

	const raw = await response.text();
	return raw;
};

export default async (request: NowRequest, response: VercelResponse) => {
	const { date } = request.query;

	if (Array.isArray(date) || !date) {
		response.status(400).json({ error: "Date must be a single valid date string" });
		return;
	}

	try {
		const raw = await fetchCSVByDate(new Date(date));

		// Use synchronous parse function
		const parsed = parse(raw, {
			columns: true,
			skip_empty_lines: true
		});

		const normalizedData = parsed.map(normalizeKeys);

		if (normalizedData.length === 0) {
			response.status(404).json({ error: "No data found for the specified date" });
		} else {
			response.status(200).json(normalizedData);
		}
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
};
