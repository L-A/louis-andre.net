import React from 'react'
import css from 'next/css'
import Page from '~/layouts/page'

var posts = [
	{
		name: "Octobot: Services status squid",
		summary: "Case study: A notification-centric mobile app"
	},
	{
		name: "baz",
		summary: "f"
	},
]

export default () => {
	let poorIterator = 0
	let postsList = posts.map ((post) => {
			return(
				<article key={poorIterator++}>
					<h2>{post.name}</h2>
					<p>{post.summary}</p>
				</article>
			)
		})

	return (
		<Page title="Journal">
			<div className="ph3 ph5-m ph6-l">
				{postsList}
			</div>
		</Page>
	)}

const style = css({

})
