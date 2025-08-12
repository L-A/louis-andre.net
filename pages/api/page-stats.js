export default async function handler(req, res) {
	const startDateString = "2021-01-15"; // First day of tracking

	const pagePath = encodeURIComponent(req.query.path);
	const request = await fetch(
		`https://lal.goatcounter.com/counter/${pagePath}.json?start=${startDateString}`
	);
	const { count } = await request.json();

	res.status(200).json({ count });
}
