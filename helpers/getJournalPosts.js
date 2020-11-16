import { createClient } from "contentful"

const clientSettings = {
	accessToken: process.env.CONTENTFUL_TOKEN,
	space: process.env.CONTENTFUL_SPACE,
}

const client = createClient(clientSettings)

export default async () => {
	const posts = await client.getEntries({
		content_type: "blogPost",
	})
	return posts.items.map((p) => p.fields)
}
