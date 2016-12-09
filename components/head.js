import React from 'react'
import Head from 'next/head'

export default (props) =>
<Head>
	<title>{(props.title ? props.title  + " - " : "") + "Louis-André Labadie"}</title>
	<link rel="stylesheet" href="/static/tachyons.min.css"/>
	<link rel="icon" href="/static/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
