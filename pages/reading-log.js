import { Palette } from "../config"
import Layout from "../components/layout"
import Link from "../components/styled-link"

export default () => (
	<Layout pageTitle="Reading Log">
		<h1>Reading Log</h1>
		<p>
			I like to read on the web, and bookmark most of it on my
			<Link color={Palette.journal} href="https://pinboard.in/u:lalabadie">
				Pinboard account
			</Link>
			. Fellow Internet person, this list is as close as you can get to my
			personal stream of thoughts.
		</p>

		<style jsx>{`
			h1 {
				color: ${Palette.reading};
			}
		`}</style>
	</Layout>
)
