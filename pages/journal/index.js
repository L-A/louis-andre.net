import React from 'react'
import Page from '~/layouts/page'
import PostList from '~/components/postlist.js'

var posts = [
	{
		name: "Octobot: Services status squid",
		summary: "Case study: A notification-centric mobile app",
		url: "projects/octobot"
	},
	{
		name: "baz",
		summary: "f"
	},
]

export default () => {
	return (
		<Page title="Journal">
			<div className="ph3 ph5-m ph6-l">
				<PostList list={posts} />
			</div>
		</Page>
	)}
