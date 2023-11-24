import client from "../tina/__generated__/client";

import Layout from "../components/layout";
import NoteEntry from "../components/note-entry";
import { Palette } from "../config";

const Notes = ({ entries }) => {
	return (
		<Layout pageTitle="Notes">
			<h1>Notes</h1>
			<ol>
				{entries.map((e) => (
					<NoteEntry {...e} key={e.date} />
				))}
			</ol>

			<style jsx>
				{`
					h1 {
						color: ${Palette.journal};
					}

					ol {
						list-style: none;
						padding: 0;
					}
				`}
			</style>
		</Layout>
	);
};

export const getStaticProps = async () => {
	const notesList = await client.queries.notesConnection();

	return {
		props: {
			entries: notesList.data.notesConnection.edges.map((e) => e.node),
		},
	};
};

export default Notes;
