import Layout from "./layout"
import { MDXProvider } from "@mdx-js/react"
import Link from "./styled-link"
import { Palette } from "../config"

const Components = {}

// We provide posts a component constructor that accepts
// metadata straight from the mdx file

export default ({ title, publishedDate }) => ({ children }) => (
	<Layout pageTitle={title}>
		<h2>
			<Link href="/journal" internal>
				Journal
			</Link>{" "}
			/ {publishedDate}
		</h2>
		<h1>{title}</h1>
		<article className="article-root">
			<MDXProvider components={Components}>{children}</MDXProvider>
		</article>
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
				.article-root p {
					margin-bottom: 32px;
				}

				.article-root img {
					max-width: 100%;
				}

				.article-root blockquote {
					border-left: solid 4px ${Palette.quoteBorder};
					font-size: 16px;
					margin-left: 0;
					padding-left: 32px;
				}
			`}
		</style>
	</Layout>
)
