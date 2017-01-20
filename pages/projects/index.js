import React from 'react'
import css from 'next/css'
import Page from '~/layouts/page'
import PostList from '~/components/postlist.js'

var posts = [
	{
		name: "Octobot: Services status squid",
		summary: "Case study: A notification-centric mobile app",
		url: "projects/octobot"
	},
	{
		name: "Little Jekyll",
		summary: "A desktop application that allows using Jekyll without the command-line",
		url: "projects/little-jekyll"
	},
	{
		name: "Fitsteady",
		summary: "Attendance and effectiveness tools for corporate trainers",
		url: "projects/fitsteady"
	},
]

export default () => {
	return (
		<Page title="Projects">
			<div className="ph3 ph5-m ph6-l">
				<PostList list={posts} />
			</div>
		</Page>
	)}
