import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../tina/__generated__/client";

const Notes = (props) => {
	return <div>{props.paths}</div>;
};

export const getStaticProps = async () => {
	const notesList = await client.queries.notesConnection();
	console.log(notesList);

	return {
		props: {
			paths: notesList.data.notesConnection.edges.map(
				(note) => note.node._sys.filename
			),
		},
	};
};

export default Notes;
