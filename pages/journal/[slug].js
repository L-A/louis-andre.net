import GetPost from "../../helpers/getJournalPost"
import GetPosts from "../../helpers/getJournalPosts"
import PostLayout from "../../components/post-layout"
import StyledLink from "../../components/styled-link"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

// Contentful-specific config
import { INLINES, BLOCKS } from "@contentful/rich-text-types"
const CustomComponents = {
	renderNode: {
		[INLINES.HYPERLINK]: ({ data: { uri } }, children) => {
			return <StyledLink href={uri}>{children}</StyledLink>
		},
		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const { title, file } = node.data.target.fields
			if (!file.contentType.includes("image")) return <></>
			return <img title={title} src={file.url} />
		},
	},
}

const BlogPost = ({ title, publicationDate, body }) => {
	console.log(body)
	return (
		<PostLayout title={title} publishedDate={publicationDate}>
			{documentToReactComponents(body, CustomComponents)}
		</PostLayout>
	)
}

export const getStaticProps = async ({ params: { slug } }) => {
	const post = await GetPost(slug)
	console.log(post)
	return { props: { ...post }, revalidate: 900 }
}

export const getStaticPaths = async () => {
	const postsList = await GetPosts()
	const pathsList = postsList.map((p) => ({ params: { slug: p.slug } }))
	return {
		paths: pathsList,
		fallback: true,
	}
}

export default BlogPost
