import React from 'react'
import css from 'next/css'
import Link from 'next/link'

export default (props) => {
	if (props.shotImageURL) {
		return (
			<Link href={props.linkTo}>
				<a className="pa2 fl w-100 w-third-ns border-box">
					<img { ...style() } src={props.shotImageURL} />
				</a>
			</Link>
		)
	} else {
		return false
	}
}

const style = (props) => css({
	border: "solid 2px white",
	boxShadow: "0 1px 4px rgba(43,48,59,0.2)",
	transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
	":hover": {
		boxShadow: "0 6px 8px rgba(43,48,59,0.1)",
		transform: "translateY(-4px)"
	}
})
