import GetPost from "../../../helpers/getJournalPostPreview";
import PostLayout from "../../../components/post-layout";
import StyledLink from "../../../components/styled-link";

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

export const getServerSideProps = async ({ params: { slug }, query }) => {
	if (query.secret !== process.env.PREVIEW_KEY) return { notFound: true };
	const post = await GetPost(slug);
	return { props: { ...post } };
};

export default BlogPost;
