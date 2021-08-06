import { Palette } from "../config"
import Layout from "../components/layout"
import Link from "../components/styled-link"
import Art from "../components/art-canvas"

export default () => (
	<Layout>
		<Art />
		<p>
			<strong>I’m Louis-André Labadie.</strong> There's a good chance you and I
			are Internet strangers. It’s a thin connection, but a warm one to me
			nonetheless.
		</p>
		<p>
			I create{" "}
			<Link color={Palette.art} href="/generative-art">
				generative art
			</Link>
			, I{" "}
			<Link color={Palette.reading} href="/reading-log">
				read online
			</Link>{" "}
			a good amount, and I{" "}
			<Link color={Palette.journal} href="journal">
				write
			</Link>{" "}
			occasionally.
		</p>
		<p>
			I work as an independent designer. My studio is called{" "}
			<Link color={Palette.text} href="http://tinyrevolt.com/en">
				Tiny Revolt
			</Link>
			.
		</p>
		<p>
			Browse around, and{" "}
			<Link color={Palette.text} href="mailto:monsieur@louis-andre.net">
				reach out
			</Link>{" "}
			if you’d like!
		</p>

		<style jsx>{`
			a.art {
				color: ${Palette.art};
			}

			a.reading-log {
				color: ${Palette.reading};
			}

			a.journal {
				color: ${Palette.journal};
			}
		`}</style>
	</Layout>
)
