import React from 'react'
import css from 'next/css'
import Link from 'next/link'

export default (props) => {
	let noLink = props.linksTo == null;
	return (
		<Link href={props.linksTo}>
			<a {...style({bgColor: props.bgColor, disabled: noLink})} className="link dib f6 lh-copy tracked b ttu white dim br2 pv2 ph3 mt1">{props.btnText}</a>
		</Link>
	)
	}

const style = (props) => {
	let borderStyle = props.disabled ? "1px solid #bababa" : null
	let textColor = props.disabled ? "#929292" : "#FFF"
	return css({
		backgroundColor: (props.bgColor || "transparent"),
		color: textColor,
		border: borderStyle,
		opacity: 0.8,
		':hover' : {opacity: "1"}
	})
}
