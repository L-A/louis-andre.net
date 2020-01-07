import { JSDOM } from "jsdom"

const pageDataRegex = /(?:<script type="text\/javascript">window\._sharedData = )(?<JSONData>.*)(?:;<\/script>)/

export default async (req, res) => {
	const document = await JSDOM.fromURL("https://instagram.com/lalabadie")
	const documentString = document.serialize()

	let pageJsonData = JSON.parse(
		pageDataRegex.exec(documentString).groups.JSONData
	).entry_data.ProfilePage[0].graphql.user

	const posts = pageJsonData.edge_owner_to_timeline_media.edges.map(
		({ node }) => ({
			thumbnailUrl: node.thumbnail_src,
			uniqueUrl: "https://www.instagram.com/p/" + node.shortcode,
			likes: node.edge_liked_by.count
		})
	)

	res.setHeader("Content-Type", "application/json")
	res.setHeader("Cache-Control", `max-age=${60 * 30}, public`) // 60 minutes caching
	res.statusCode = 200
	res.end(JSON.stringify(posts))
}
