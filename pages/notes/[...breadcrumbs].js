import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../tina/__generated__/client";
import Link from "next/link";

import Layout from "../../components/layout";
import { Palette } from "../../config";
import NoteEntry from "../../components/note-entry";
import StyledLink from "../../components/styled-link";

const Note = (props) => {
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	});

	return (
		<Layout naked>
			<nav className="back-to-notes">
				<h1>
					<Link href="/">
						<a>
							<img src="/images/img-logo.svg" alt="Louis-André Labadie" />
						</a>
					</Link>
				</h1>
				<StyledLink href={"/notes"}>Back to notes</StyledLink>
			</nav>

			<NoteEntry {...data.notes} asList={false} />

			<style jsx>{`
				.back-to-notes {
					margin-bottom: 64px;
					text-align: center;
				}
			`}</style>
		</Layout>
	);
};

export const getStaticProps = async ({ params }) => {
	let data = {};
	let query = {};
	let variables = { relativePath: `${params.breadcrumbs.join("/")}.md` };
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
	const notesPaths = notesListData.data.notesConnection.edges.map((note) => ({
		params: { breadcrumbs: note.node._sys.breadcrumbs },
	}));

	return {
		paths: notesPaths,
		fallback: false,
	};
};

export default Note;
