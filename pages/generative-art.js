import { Palette } from "../config"
import Layout from "../components/layout"
import Link from "../components/styled-link"

export default () => (
	<Layout pageTitle="Generative Art">
		<h1>Generative Art</h1>
		<p>
			What do you do when you enjoy coding, but want an expressive outlet where
			the computer is a playful tool?{" "}
			<Link
				color={Palette.reading}
				href="https://en.wikipedia.org/wiki/Generative_art"
			>
				Generative art
			</Link>{" "}
			is where it’s at! Here’s some of mine.
		</p>

		<p className="notice">
			If you want to stay up to date on the pieces I make, I post them{" "}
			<Link href="https://www.instagram.com/lalabadie/">here on Instagram</Link>
			.
		</p>

		<style jsx>{`
			h1 {
				color: ${Palette.art};
			}

			.notice {
				background-color: ${Palette.instagramBackground};
				border-radius: 3px;
				padding: 16px 32px;
				margin-top: 32px;
				max-width: 50em;
			}
		`}</style>
	</Layout>
)
