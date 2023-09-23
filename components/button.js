import React from 'react'
import Link from 'next/link'

export default (props) => {
	let disabled = props.linksTo == null;
	let styleOverrides = (props, disabled) => (
		{
			backgroundColor: props.bgColor || 'transparent',
			border: disabled ? "1px solid #bababa" : null,
			color: disabled ? "#929292" : "#FFF"
		}
	)
	let innards = (
		<a style={styleOverrides(props, disabled)} className="link dib f6 lh-copy tracked b ttu white br2 pv2 ph3 mt1">
			{props.btnText}
			<style jsx>{`
				a {
					opacity: 0.8;
				}
				a:hover {
					opacity: 1;
				}
			`}</style>
		</a>
	)
	return (
		props.linksTo
		? <Link legacyBehavior href={props.linksTo}>{innards}</Link>
		: innards
	)
}
