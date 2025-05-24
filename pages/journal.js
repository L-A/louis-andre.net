import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

import { Palette } from "../config";
import Layout from "../components/layout";

const PostLink = ({ title, description, date, inFrench, slug }) => (
	<li className="post">
		<Link href={`/journal/${slug}`}>
			<a>
				<h2>{title}</h2>
				<p>
					{inFrench ? <span className="language">In French</span> : false}
					{description}
				</p>
				<p className="date">
					{new Date(date).toLocaleDateString("en-CA", {
						year: "numeric",
						month: "long",
					})}
				</p>
			</a>
		</Link>
		<style jsx>{`
			.post {
				margin: 32px 0;
				transition: opacity 0.25s ease-out;
			}
			.post h2 {
				font-size: 22px;
				margin: 8px 0;
			}

			.post p {
				margin: 8px 0;
			}

			.post .date {
				color: ${Palette.journal};
				font-size: 13px;
			}

			.post:hover {
				opacity: 0.7;
				transition: opacity 0.1s ease-out;
			}

			.language {
				border-radius: 3px;
				background-color: ${Palette.readingTagBackground};
				color: ${Palette.readingTag};
				font-size: 14px;
				font-weight: normal;
				margin-right: 8px;
				padding: 2px 4px;
			}
		`}</style>
	</li>
);

const Journal = ({ posts }) => {
	return (
		<Layout pageTitle="Journal">
			<h1>Journal</h1>

			<div className="kind-callout">
				<img src="/images/logo-kind.svg" alt="The Kind Dispatch" />
				<p>
					I've been writing a short newsletter called{" "}
					<strong>the Kind Dispatch</strong>. It's mostly about art
					and&nbsp;tech.
				</p>
				<p>You're more than welcome to join&nbsp;in!</p>
				<a href="https://buttondown.email/Kind">Show me!</a>
			</div>

			<p>Here are a few articles I’ve written at different times:</p>

			<ul className="posts">
				{posts.map((post) => (
					<PostLink {...post} key={post.slug} />
				))}
			</ul>

			<style jsx>{`
				h1 {
					color: ${Palette.journal};
				}

				.posts {
					list-style: none;
					padding: 0;
					margin-top: 64px;
				}

				.kind-callout {
					background-color: #e8f6fc;
					border-radius: 12px;
					padding: 32px;
					max-width: 392px;
					margin-bottom: 64px;
				}

				.kind-callout img {
					display: block;
					margin: 0 auto 32px;
				}

				.kind-callout a {
					background-color: ${Palette.journal};
					border-radius: 4px;
					color: #fff;
					padding: 6px 12px;
					text-align: center;
					display: block;
					transition: transform 0.1s ease-out, opacity 0.2s ease-out;
				}

				.kind-callout a:hover {
					opacity: 0.7;
					transform: scale(1.01);
				}
			`}</style>
		</Layout>
	);
};

export const getStaticProps = async () => {
	// Read all markdown files from /content/journal
	const journalDir = path.join(process.cwd(), "content", "journal");
	const files = fs.readdirSync(journalDir);

	// Parse each file and extract frontmatter
	const posts = files
		.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
		.map((file) => {
			const filePath = path.join(journalDir, file);
			const fileContents = fs.readFileSync(filePath, "utf-8");
			const { data, content } = matter(fileContents);

			// Skip files without date in frontmatter
			if (!data.date) return null;

			// Extract slug from filename (remove extension)
			const slug = file.replace(/\.mdx?$/, "");

			return {
				title: data.title,
				description: data.description,
				date: new Date(data.date).toISOString(), // Needs to be serializable
				inFrench: data.inFrench || false,
				slug: slug,
			};
		})
		.filter(Boolean) // Remove null values
		.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (new to old)

	return { props: { posts }, revalidate: 900 }; // Revalidate every 15 minutes
};

export default Journal;
