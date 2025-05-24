import path from "path";
import { getMarkdownFiles } from "../helpers/getMarkdownFiles";

import Layout from "../components/layout";
import NoteEntry from "../components/note-entry";
import { Palette } from "../config";

const Notes = ({ notes }) => {
	return (
		<Layout pageTitle="Notes">
			<h1>Notes</h1>
			<ol>
				{notes.map((n) => (
					<NoteEntry {...n} key={n.date} />
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
	const notesDir = path.join(process.cwd(), "content", "notes");
	const notes = getMarkdownFiles(notesDir)
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.map((p) => ({
			...p,
			date: new Date(p.date).toISOString(), // Needs to be serializable
		})); // Sort by date (new to old)

	return {
		props: {
			notes,
		},
	};
};

export default Notes;
