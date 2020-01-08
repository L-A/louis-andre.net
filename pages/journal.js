import Link from "next/link"
import posts from "../journal-posts"
import { Palette } from "../config"
import Layout from "../components/layout"

const PostLink = ({ title, slug, description, published }) => (
	<li key={slug} className="post">
		<Link href={`/journal/${slug}`}>
			<a>
				<h2>{title}</h2>
				<p>{description}</p>
				<p className="date">{published}</p>
			</a>
		</Link>
		<style jsx>{`
			.post {
				margin: 32px 0;
			}
			.post h2 {
				font-size: 22px;
				margin: 8px 0;
			}

			.post p {
				margin: 8px 0;
			}

			.post .date {
				color: ${Palette.journal};
				font-size: 13px;
			}
		`}</style>
	</li>
)

export default () => (
	<Layout pageTitle="Journal">
		<h1>Journal</h1>
		<p>Too infrequently, I share what I write. Here’s the outcome!</p>

		<ul className="posts">
			{posts.map(post => (
				<PostLink {...post} />
			))}
		</ul>

		<style jsx>{`
			h1 {
				color: ${Palette.journal};
			}

			.posts {
				list-style: none;
				padding: 0;
				margin-top: 64px;
			}
		`}</style>
	</Layout>
)
