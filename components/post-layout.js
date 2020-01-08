import Layout from "./layout"
import { MDXProvider } from "@mdx-js/react"

const Components = {}

// We provide posts a component constructor that accepts
// metadata straight from the mdx file

export default ({ title, date }) => ({ children }) => (
	<Layout pageTitle={title}>
		<h2>{date}</h2>
		<h1>{title}</h1>
		<MDXProvider components={Components}>{children}</MDXProvider>
	</Layout>
)
