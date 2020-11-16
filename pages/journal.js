import Link from "next/link"
import { Palette } from "../config"
import Layout from "../components/layout"

import GetPosts from "../helpers/getJournalPosts"

const PostLink = ({ title, slug, description, publicationDate, inFrench }) => (
	<li className="post">
		<Link href={`/journal/${slug}`}>
			<a>
				<h2>{title}</h2>
				<p>
					{inFrench ? <span className="language">In French</span> : false}
					{description}
				</p>
				<p className="date">
					{new Date(publicationDate).toLocaleDateString("en-CA", {
						year: "numeric",
						month: "long",
					})}
				</p>
			</a>
		</Link>
		<style jsx>{`
			.post {
				margin: 32px 0;
				transition: opacity 0.25s ease-out;
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

			.post:hover {
				opacity: 0.7;
				transition: opacity 0.1s ease-out;
			}

			.language {
				border-radius: 3px;
				background-color: ${Palette.readingTagBackground};
				color: ${Palette.readingTag};
				font-size: 14px;
				font-weight: normal;
				margin-right: 8px;
				padding: 2px 4px;
			}
		`}</style>
	</li>
)

const Journal = ({ posts }) => {
	return (
		<Layout pageTitle="Journal">
			<h1>Journal</h1>
			<p>
				I haven't been very consistent in writing what I learn in the past
				years. Here are some prior articles, as I get my writing habit back on
				track.
			</p>

			<ul className="posts">
				{posts.map((post) => (
					<PostLink {...post} key={post.slug} />
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
}

export const getStaticProps = async () => {
	const posts = await GetPosts()
	// That's reverse chronological order (new to old)
	const orderedPosts = posts.sort(
		(a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
	)
	return { props: { posts: orderedPosts }, revalidate: 900 } // Revalidate every 15 minutes
}

export default Journal
