import type { VercelRequest, VercelResponse } from "@vercel/node";
import qs from "qs";

import { endpoints } from "../../../util/endpoints";
import { fetcher } from "../__util/fetcher";
import {
	createSortQuery,
	sortBy,
	createCountySortGroup,
} from "../__util/query";

const endpoint = endpoints.casesCounty;

export default async (req: VercelRequest, res: VercelResponse) => {
	try {
		// Extract and parse the resultOffset query parameter, default to 0 if not provided or invalid
		const resultOffset =
			typeof req.query.resultOffset === "string"
				? Number.parseInt(req.query.resultOffset, 10)
				: 0;

		// Handle the case where req.query.field might be a string or an array of strings
		const field = Array.isArray(req.query.field)
			? req.query.field[0] // Use the first element if it's an array
			: req.query.field; // Use the value directly if it's a string

		// Ensure the field is valid according to sortBy
		const validField =
			typeof field === "string" && field in sortBy ? field : "confirmed";

		// Create query parameters
		const query = createSortQuery(createCountySortGroup(validField), {
			resultOffset,
		});

		// Fetch data from the API
		const response = await fetcher(`${endpoint}?${qs.stringify(query)}`);

		// Check for successful response
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		// Parse and return the response data
		const data = await response.json();
		res.json(data);
	} catch (error) {
		// Handle errors and send a meaningful response to the client
		console.error("Error occurred while processing the request:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
