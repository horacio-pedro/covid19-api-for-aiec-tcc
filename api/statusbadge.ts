import type { VercelRequest, VercelResponse } from "@vercel/node";
import withRetry from "@zeit/fetch-retry";
import unfetch from "isomorphic-unfetch";
const fetch = withRetry(unfetch);
export default async function handler(req: VercelRequest, res: VercelResponse) {
	try {
		const result = await fetch(status);
		const badge = await result.json();
		res.json({
			schemaVersion: 1,
			label: (<string>req.query.status).replace(/_/g, " "),
			message: badge[req.query.status],
			color: req.query.status === "error" ? "red" : "green",
		});
	} catch (e) {
		res.json({
			isError: true,
			schemaVersion: 1,
			label: (<string>req.query.status).replace(/_/g, " "),
			message: "error",
			color: "red",
		});
	}
}
