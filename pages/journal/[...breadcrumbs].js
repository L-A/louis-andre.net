import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";

import PostLayout from "../../components/post-layout";
import CustomTinaMarkdown from "../../components/custom-tina-markdown";

const dateOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

const JournalEntry = (props) => {
	const {
		data: {
			journal: { title, date, body },
		},
	} = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	});

	const formattedDate = new Date(date).toLocaleString("en-CA", dateOptions);

	return (
		<PostLayout title={title} publishedDate={formattedDate}>
			<CustomTinaMarkdown content={body} />
		</PostLayout>
	);
};

export const getStaticProps = async ({ params }) => {
	let data = {};
	let query = {};
	let variables = { relativePath: `${params.breadcrumbs.join("/")}.mdx` };
	try {
		const res = await client.queries.journal(variables);
		query = res.query;
		data = res.data;
		variables = res.variables;
	} catch {
		// swallow errors related to document creation
	}
	return {
		props: {
			variables: variables,
			data: data,
			query: query,
		},
	};
};

export const getStaticPaths = async () => {
	const list = await client.queries.journalConnection();
	const listPaths = list.data.journalConnection.edges.map((entry) => ({
		params: { breadcrumbs: entry.node._sys.breadcrumbs },
	}));

	return {
		paths: listPaths,
		fallback: false,
	};
};

export default JournalEntry;
