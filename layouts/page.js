import React from 'react'
import css from 'next/css'
import Head from '~/components/head' // I really should change this nomenclature
import Header from '~/components/header'

export default (props) => (
  <div {...style} className="avenir min-vh-100">
		<Head title={props.title} />
		<Header />
		{props.children}
	</div>
)

const style = css({
})
