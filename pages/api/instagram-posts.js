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
	// half-hour caching, serve stale if needed to remain fast
	res.setHeader("Cache-Control", `s-maxage=${30 * 60}, stale-while-revalidate`)
	res.statusCode = 200
	res.end(JSON.stringify(posts))
}
