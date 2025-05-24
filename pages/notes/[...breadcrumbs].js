import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { getMarkdownFiles } from "../../helpers/getMarkdownFiles";

import Layout from "../../components/layout";
import NoteEntry from "../../components/note-entry";
import StyledLink from "../../components/styled-link";

const Note = ({ data, content }) => {
	return (
		<Layout naked>
			<nav className="back-to-notes">
				<h1>
					<Link href="/">
						<img src="/images/img-logo.svg" alt="Louis-André Labadie" />
					</Link>
				</h1>
				<StyledLink href={"/notes"}>Back to notes</StyledLink>
			</nav>

			<NoteEntry {...data} asList={false} body={content} />

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
	const filePath =
		path.join(process.cwd(), "content", "notes", ...params.breadcrumbs) + ".md";
	const fileContents = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContents);

	data.date = new Date(data.date).toISOString();

	return { props: { data, content } };
};

export const getStaticPaths = async () => {
	const notesDir = path.join(process.cwd(), "content", "notes");
	const notes = getMarkdownFiles(notesDir)
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.map((p) => ({
			...p,
			date: new Date(p.date).toISOString(), // Needs to be serializable
		})); // Sort by date (new to old)

	const paths = notes.map((n) => ({
		params: { breadcrumbs: n.slug.split("/") },
	}));

	return {
		paths,
		fallback: false,
	};
};

export default Note;
