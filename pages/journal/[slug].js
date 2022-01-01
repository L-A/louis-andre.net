import GetPost from "../../helpers/getJournalPost";
import GetPosts from "../../helpers/getJournalPosts";
import PostLayout from "../../components/post-layout";
import StyledLink from "../../components/styled-link";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// Contentful-specific config
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
const CustomComponents = {
	renderNode: {
		[INLINES.HYPERLINK]: ({ data: { uri } }, children) => {
			return <StyledLink href={uri}>{children}</StyledLink>;
		},
		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const { title, file } = node.data.target.fields;
			if (!file.contentType.includes("image")) return <></>;
			return (
				<img
					title={title}
					srcset={`
					${file.url}?w=1448 1448w,
					${file.url}?w=724 724w,
				`}
					src={`${file.url}?w=1448`}
				/>
			);
		},
	},
};

const BlogPost = ({ title, publicationDate, body }) => {
	return (
		<PostLayout title={title} publishedDate={publicationDate}>
			{documentToReactComponents(body, CustomComponents)}
		</PostLayout>
	);
};

export const getStaticProps = async ({ params: { slug } }) => {
	const post = await GetPost(slug);
	return { props: { ...post }, revalidate: 900 };
};

export const getStaticPaths = async () => {
	const postsList = await GetPosts();
	const pathsList = postsList.map((p) => ({ params: { slug: p.slug } }));
	return {
		paths: pathsList,
		fallback: true,
	};
};

export default BlogPost;
