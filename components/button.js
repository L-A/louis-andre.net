import React from 'react'
import css from 'next/css'
import Link from 'next/link'

export default (props) => {
	if (props.linksTo) {
		return (
			<Link href={props.linksTo}>
				<a {...style({bgColor: props.bgColor})} className="link dib f6 lh-copy tracked b ttu white dim br2 pv2 ph3 mt1">{props.btnText}</a>
			</Link>
		)
		} else {
			return false	
		}
	}

const style = (props) => css({
	backgroundColor: (props.bgColor || "#AAA"),
	opacity: 0.8,
	':hover' : {opacity: "1"}
})
