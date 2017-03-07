import React from 'react'
import Page from '../layouts/page'
import parsemd from 'markdown-to-react-components'
import Head from 'next/head'

export default Page( (props) => {
	let postContent = props.postMarkdown
		? [props.children, parsemd(props.postMarkdown).tree]
		: props.children

	return (
		<div>
			<h1 className="ph3 ph5-m ph6-l f1 measure-narrow" style={{ color: props.titleColor }}>{props.title}</h1>
			<div className="ph3 ph5-m ph6-l lh-copy">
				{ postContent  }
			</div>
			<Head>
				<title>{props.title} - Louis-André Labadie</title>
			</Head>
		</div>
	)
})

const titleStyle = (titleColor) => {
	color: titleColor
}

parsemd.configure({
	img: React.createClass({
		render() {
			return <img className="mw-100"  src={this.props.src} alt={this.props.alt}/>
		}
	}),
	p: React.createClass({
		render() {
			return <p className="f4 measure"> {this.props.children} </p>
		}
	}),
	h2: React.createClass({
		render() {
			return <h2 className="f2 dark-gray measure"> {this.props.children} </h2>
		}
	}),
	h3: React.createClass({
		render() {
			return <h3 className="f3 fw3 measure"> {this.props.children} </h3>
		}
	}),
	hr: React.createClass({
		render() {
			return <hr className="f4 mv5 mh0 measure" />
		}
	}),
	a: React.createClass({
		render() {
			return <a className="link dim blue" href={this.props.href}> {this.props.children} </a>
		}
	})
})
