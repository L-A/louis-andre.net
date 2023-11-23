import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../tina/__generated__/client";
import Layout from "../../components/layout";

const Note = (props) => {
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	});

	console.log(data);
	return (
		<Layout>
			<h1>Note: {data.notes.date}</h1>
			<TinaMarkdown content={data.notes.body} />
		</Layout>
	);
};

export const getStaticProps = async ({ params }) => {
	let data = {};
	let query = {};
	let variables = { relativePath: `${params.filename}.md` };
	try {
		const res = await client.queries.notes(variables);
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
	const notesListData = await client.queries.notesConnection();
	console.log(notesListData);

	return {
		paths: notesListData.data.notesConnection.edges.map((note) => ({
			params: { filename: note.node._sys.filename },
		})),
		fallback: false,
	};
};

export default Note;
