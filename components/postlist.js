import React from 'react'
import Link from 'next/prefetch'

export default (props) => {
	let poorIterator = 0
	var posts = props.list
		var list = posts.map ((post) => {
		return (
			<article key={poorIterator++}>
			<h2><Link href={post.url}><a>{post.name}</a></Link></h2>
				<p>{post.summary}</p>
			</article>
		)
	})
	return <div>{list}</div>
}
