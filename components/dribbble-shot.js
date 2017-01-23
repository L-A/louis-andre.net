
import React from 'react'
import css from 'next/css'
import Link from 'next/link'

export default (props) => {
	if (props.shotImageURL) {
		return (
			<Link href={props.linksTo}>
				<a className="pa3 fl w-100 w-third-ns border-box">
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
	boxShadow: "0 4px 10px rgba(0,0,0,0.1)" 	
	}
)
