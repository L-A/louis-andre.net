import React from 'react'
import Page from '~/layouts/page'
import Link from 'next/prefetch'

var posts = [
	{
		name: "VESA mounting a 13 inch Cintiq",
		summary: "Small build log for making the graphic tablet VESA compatible",
		url: "/journal/cintiq-vesa-mount",
		date: "Published in December 2016"
	},
	{
		name: "Octobot",
		summary: "Case study: A notification-centric mobile app",
		url: "/journal/octobot",
		date: "Released in 2014"
	},
	{
		name: "Fitsteady",
		summary: "Attendance and effectiveness tools for corporate trainers",
		url: "/journal/fitsteady",
		date: "Published in February 2016"
	},
	{
		name: "Little Jekyll",
		summary: "A desktop application that allows using Jekyll without the command-line",
		url: "/journal/little-jekyll",
		date: "Released in December 2015"
	},
	{
		name: "The hands of others",
		summary: "A bit of a love letter to wonkiness and the human touch",
		url: "/journal/the-hands-of-others",
		date: "Published in May 2014"
	},{
		name: "A Retina workflow for Photoshop",
		summary: "How I handled 2x in 2014",
		url: "/journal/retina-photoshop",
		date: "Published in May 2014"
	},
	{
		name: "The basics of a great web app color palette",
		summary: "Useful theory and steps for getting unstuck",
		url: "/journal/web-app-palette",
		date: "Published in May 2014"
	},
]

const PostList = (props) => {
	let poorIterator = 0
	var posts = props.list
		var list = posts.map ((post) => {
		return (
			<article key={poorIterator++} className="pb3">
				<h2 className="mb1">
					<Link href={post.url}>
						<a className="f3 f2-ns fw3 navy no-underline dim pa0">{post.name}</a>
					</Link>
				</h2>
				<p className="mt3 mid-gray measure-wide lh-copy">{post.summary}</p>
				<p className="mt2 code f6 fw3 silver measure">{post.date}</p>
			</article>
		)
	})
	return <div>{list}</div>
}

export default Page( () => (
		<div className="ph3 ph5-m ph6-l">
			<PostList list={posts} />
		</div>
	), { title: "Journal" }
)
