import Layout from "./layout";
import Link from "./styled-link";
import { Palette } from "../config";

const Post = ({ title, publishedDate, children }) => (
	<Layout pageTitle={title}>
		<h2>
			<Link href="/journal" internal>
				Journal
			</Link>{" "}
			/ {publishedDate}
		</h2>
		<h1>{title}</h1>
		<article className="article-root">{children}</article>
		<style jsx>{`
			article {
				font-size: 18px;
			}

			h1 {
				color: ${Palette.text};
			}

			h2 {
				color: ${Palette.journal};
				font-size: 14px;
				font-weight: normal;
			}
		`}</style>
		<style jsx global>
			{`
				.article-root h1,
				.article-root h2 {
					margin-top: 96px;
					margin-bottom: 32px;
				}

				.article-root p {
					margin-bottom: 16px;
				}

				.article-root img {
					max-width: 100%;
				}

				.article-root blockquote {
					border-left: solid 4px ${Palette.quoteBorder};
					font-size: 20px;
					margin: 32px 0;
					padding-left: 32px;
				}

				.article-root hr {
					margin: 96px 0 64px;
				}

				.article-root code {
					font-family: monospace;
					font-size: 0.9em;
					color: ${Palette.inlineCode};
				}

				h2#footnote-label {
					color: ${Palette.journal};
					font-size: 1rem;
				}
			`}
		</style>
	</Layout>
);

export default Post;
