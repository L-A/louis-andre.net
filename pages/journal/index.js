import React from 'react'
import Page from '~/layouts/page'
import PostList from '~/components/postlist.js'

var posts = [
	{
		name: "Octobot",
		summary: "Case study: A notification-centric mobile app",
		url: "/journal/octobot",
		date: "Published in february 2016"
	},
	{
		name: "Fitsteady",
		summary: "Attendance and effectiveness tools for corporate trainers",
		url: "/journal/fitsteady",
		date: "Published in february 2016"
	},
	{
		name: "Little Jekyll",
		summary: "A desktop application that allows using Jekyll without the command-line",
		url: "/journal/little-jekyll",
		date: "Published in december 2015"
	},
	{
		name: "A Retina workflow for Photoshop",
		summary: "2x in 2014",
		url: "/journal/retina-photoshop",
		date: "Published in may 2014"
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
