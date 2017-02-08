import React from 'react'
import Head from '~/components/head' // I really should change this nomenclature
import Header from '~/components/header'

export default (props) => (
  <div className="avenir min-vh-100">
		<Head title={props.title} />
		<Header />
		{props.children}
	</div>
)
