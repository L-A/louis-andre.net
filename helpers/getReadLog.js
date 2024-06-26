import fetch from "isomorphic-unfetch";
import { Palette } from "../config";

const raindropToken = process.env.RAINDROP_TOKEN;

const getCollection = async (collectionID) => {
	const requestURL =
		"https://api.raindrop.io/rest/v1/raindrops/" +
		collectionID +
		"?perpage=200";
	const response = await fetch(requestURL, {
		headers: { Authorization: "Bearer " + raindropToken },
	});
	const { items } = await response.json();
	return items || [];
};

const GetReadLog = async () => {
	const archived = (
		await getCollection(process.env.RAINDROP_COLLECTION_ID)
	).map((item) => ({ ...item, isArchived: true }));
	const unread = (await getCollection(process.env.RAINDROP_UNREAD_ID)).map(
		(item) => ({ ...item, isArchived: false })
	);

	const allLinks = [...archived, ...unread].sort(
		(a, b) => new Date(b.created) - new Date(a.created)
	);
	const links = allLinks.map((item) => ({
		slug: item.link,
		url: item.link,
		isArchived: item.isArchived,
		title: item.title,
		createdAt: item.created,
		labels: item.tags.map((i) => ({ name: i, color: Palette.journal })),
		description: item.excerpt,
	}));

	return { links };
};

export default GetReadLog;
