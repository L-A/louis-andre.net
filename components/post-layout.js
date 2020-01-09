import Layout from "./layout"
import { MDXProvider } from "@mdx-js/react"
import Link from "./styled-link"
import { Palette } from "../config"

const Components = {
	p: props => (
		<p {...props} style={{ fontSize: "18px", marginBottom: "32px" }} />
	),
	img: props => <img {...props} style={{ maxWidth: "100%" }} />
}

// We provide posts a component constructor that accepts
// metadata straight from the mdx file

export default ({ title, date }) => ({ children }) => (
	<Layout pageTitle={title}>
		<h2>
			<Link href="/journal" internal>
				Journal
			</Link>{" "}
			/ {date}
		</h2>
		<h1>{title}</h1>
		<MDXProvider components={Components}>{children}</MDXProvider>
		<style jsx>{`
			h1 {
				color: ${Palette.text};
			}

			h2 {
				color: ${Palette.journal};
				font-size: 14px;
				font-weight: normal;
			}
		`}</style>
	</Layout>
)
