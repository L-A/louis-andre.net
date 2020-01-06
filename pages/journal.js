import { Palette } from "../config"
import Layout from "../components/layout"

export default () => (
	<Layout pageTitle="Journal">
		<h1>Journal</h1>
		<p>Too infrequently, I share what I write. Here’s the outcome!</p>

		<style jsx>{`
			h1 {
				color: ${Palette.journal};
			}
		`}</style>
	</Layout>
)
