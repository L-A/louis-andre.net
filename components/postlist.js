import React from 'react'
import Link from 'next/prefetch'

export default (props) => {
	let poorIterator = 0
	var posts = props.list
		var list = posts.map ((post) => {
		return (
			<article key={poorIterator++} className="pb3">
				<h2 className="mb1">
					<Link href={post.url}>
						<a className="f2 fw3 navy no-underline dim pa0">{post.name}</a>
					</Link>
				</h2>
				<p className="mt3">{post.summary}</p>
				<p className="mt2 code f6 fw3 silver">{post.date}</p>
			</article>
		)
	})
	return <div>{list}</div>
}
