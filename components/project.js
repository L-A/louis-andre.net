import React from 'react'
import Link from 'next/link'
import Btn from 'components/button'
import { Translate } from 'helpers/lang'

const T = Translate({
  en: {
    read: "Read about it"
  },
  fr: {
    read: "Étude de cas"
  }
})

export default (props) => (
  <article className="ph3 ph5-m ph6-l mb3 mb5-ns cf">
		<div className="fl-ns w-50-ns w-66-l">
			<h1 className="mb0 f2" style={titleStyle(props.titleColor)}>{props.name}</h1>
      {props.children}
			<Btn btnText={props.btnText || T.Key("read")} bgColor={props.buttonColor} linksTo={props.btnURL} />
		</div>
		<img src={props.image ? "static/" + props.image : ""} className="fr-ns w-50-ns mw5 pt4 w-33-l db dib-ns center"/>
    <style jsx>{`
      img { max-height: 70vh; }
    `}</style>
	</article>
)

const titleStyle = (titleColor) => {
	return {
	'color' : titleColor
	}
}

const ClientLink = (clientProps) => {
	if (clientProps) {
		return <Link legacyBehavior href={clientProps.url}>
		<a className="link gray">{clientProps.name}</a>
		</Link>
	}
}
