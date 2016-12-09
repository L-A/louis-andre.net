import React from 'react'
import css from 'next/css'
import Link from 'next/link'
import Btn from '~/components/button'

export default (props) => (
  <article className="ph3 ph5-m ph6-l pv5 cf">
		<div className="fl-ns w-50-ns w-66-l">
			<h1 className="mb0 f2"  {...titleStyle(props.titleColor)}>{props.name}</h1>	
			{props.children}
			<Btn btnText="Read about it" bgColor={props.buttonColor} linksTo={props.btnURL} />
		</div>
		<img src={props.image ? "static/" + props.image : ""} className="fr-ns w-50-ns pt4 w-33-l"/> 
	</article>
)

const titleStyle = (titleColor) => {
	return css({
	'color' : titleColor 
	})
}

const ClientLink = (clientProps) => {
	if (clientProps) {
		return <Link href={clientProps.url}>
		<a className="link gray">{clientProps.name}</a>
		</Link>
	}
}
