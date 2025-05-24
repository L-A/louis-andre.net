import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getMarkdownFiles } from "../../helpers/getMarkdownFiles";
import PostLayout from "../../components/post-layout";
import Markdown from "../../components/configured-markdown";

const dateOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

const JournalEntry = ({data: {date, title}, content}) => {
	const formattedDate = new Date(date).toLocaleString("en-CA", dateOptions);

	return (
		<PostLayout title={title} publishedDate={formattedDate}>
			<Markdown>{content}</Markdown>
		</PostLayout>
	);
};

export const getStaticProps = async ({ params }) => {
	const filePath =
		path.join(process.cwd(), "content", "journal", ...params.breadcrumbs) + ".md";
	const fileContents = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContents);

	data.date = new Date(data.date).toISOString();

	return { props: { data, content } };
};

export const getStaticPaths = async () => {
const notesDir = path.join(process.cwd(), "content", "journal");
	const entries = getMarkdownFiles(notesDir)
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.map((p) => ({
			...p,
			date: new Date(p.date).toISOString(), // Needs to be serializable
		})); // Sort by date (new to old)

	const paths = entries.map((n) => ({
		params: { breadcrumbs: n.slug.split("/") },
	}));

	return {
		paths,
		fallback: false,
	};
};

export default JournalEntry;
