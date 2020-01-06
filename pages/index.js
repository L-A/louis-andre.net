import { Palette } from "../config"
import Layout from "../components/layout"
import Link from "../components/styled-link"

export default () => (
	<Layout>
		<h1>Hello!</h1>
		<img className="art-canvas" src="images/placeholder-canvas.png" />
		<p>
			<strong>I’m Louis-André Labadie.</strong> We’re probably Internet
			strangers. It’s a thin connection, but a warm one to me nonetheless.
		</p>
		<p>
			I do a bit of{" "}
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
		<p>Browse around, and reach out if you’d like!</p>

		<style jsx>{`
			.art-canvas {
				margin-left: -5%;
				margin-right: -5%;
				max-width: 110%;
			}

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
