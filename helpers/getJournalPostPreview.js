import { createClient } from "contentful";

const clientSettings = {
	accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
	space: process.env.CONTENTFUL_SPACE,
	host: "preview.contentful.com",
};

const client = createClient(clientSettings);

export default async (slug) => {
	const post = await client.getEntries({
		content_type: "blogPost",
		"fields.slug": slug,
	});

	if (post.items.length !== 1)
		throw "Single post query returned zero or several posts";
	return post.items[0].fields;
};
