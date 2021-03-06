import { Palette } from "../config"
import Layout from "../components/layout"
import Link from "../components/styled-link"

const posts = [
	{
		uniqueUrl: "https://www.instagram.com/p/CBlDd8JHo8p/",
		thumbnailName: "crawlies",
	},
	{
		uniqueUrl: "https://www.instagram.com/p/CAQJ7V8sfWi/",
		thumbnailName: "exploring-paths",
	},
	{
		uniqueUrl: "https://www.instagram.com/p/B9t72K3g_01/",
		thumbnailName: "convergence-7",
	},
	{
		uniqueUrl: "https://www.instagram.com/p/B8RPV4YDiHu/",
		thumbnailName: "glitch-circles",
	},
	{
		uniqueUrl: "https://www.instagram.com/p/B55PhUkn9d8/",
		thumbnailName: "vapor",
	},
	{
		uniqueUrl: "https://www.instagram.com/p/B4Khuh_Hiyr/",
		thumbnailName: "scratched-circle",
	},
]

const GenerativeArt = () => (
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
			is where it’s at! Here are some of my pieces.
		</p>

		<p>
			<strong>A note on NFTs:</strong> My only pieces are minted on Tezos (
			<span className="address">xtz</span>) and sold from the address{" "}
			<span className="address">tz1ZvTGYH5EBwgmaYngELeUw1qzgQRJLKoDM</span>.
			Look them up on{" "}
			<Link
				color={Palette.reading}
				href="https://www.hicetnunc.xyz/tz/tz1ZvTGYH5EBwgmaYngELeUw1qzgQRJLKoDM"
			>
				Hic et Nunc
			</Link>
			!
		</p>

		<p className="notice">
			If you want to stay up to date on my art, I post{" "}
			<Link href="https://www.instagram.com/lalabadie/">here on Instagram</Link>
			.
		</p>

		<div className="posts">
			{posts ? (
				posts.map((post) => (
					<a
						className="instagram-preview"
						key={post.uniqueUrl}
						href={post.uniqueUrl}
					>
						<img src={`/images/insta/${post.thumbnailName}.jpg`} alt="" />
					</a>
				))
			) : (
				<p className="error">
					It seems like I coded a goof, and can't retrieve Instagram images
					right now. You can{" "}
					<Link href="https://www.instagram.com/lalabadie/">
						jump over to my page
					</Link>{" "}
					if you'd like to see them!
				</p>
			)}
		</div>

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

			.posts {
				margin-top: 32px;
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-column-gap: 32px;
				grid-row-gap: 32px;
			}

			span.address {
				font-size: 0.8em;
				font-family: courier, monospace, sans-serif;
			}

			.instagram-preview {
				display: block;
				max-width: 320px;
				transition: transform 0.2s ease-out;
				transform-origin: center bottom;
			}

			.instagram-preview:hover {
				transform: scale(1.01) translateY(-3px);
			}

			.instagram-preview img {
				display: block;
				max-width: 100%;

				box-shadow: 0px 16px 16px rgba(0, 0, 0, 0.05),
					0px 6px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.1);
				transition: box-shadow 0.2s ease-out;
			}

			.instagram-preview:hover img {
				box-shadow: 0px 24px 16px rgba(0, 0, 0, 0.05),
					0px 12px 8px rgba(0, 0, 0, 0.02), 0px 5px 2px rgba(0, 0, 0, 0.01);
			}

			.error {
				font-size: 14px;
				font-style: italic;
				grid-column: span 2;
			}
		`}</style>
	</Layout>
)

export default GenerativeArt
