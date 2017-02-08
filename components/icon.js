import React from 'react'
import css from 'next/css'

export default (props) => {
	return (
		<span {...style(props.iconName)} ></span>
	)
}

const icons = [
	{
		name: "dribbble",
		url: "/static/images/icons/icon_dribbble.svg"
	},
	{
		name: "cases",
		url: "/static/images/icons/icon_case_studies.svg"
	}
]

const style = (iconName) => {
	let iconUrl
	icons.forEach((icon) => {
		if (icon.name == iconName) {
			iconUrl = icon.url
		}
	})

	return css ({
		display: "inline-block",
		height: "1.1em",
		marginLeft: "0.4em",
		width: "1.6em",
		background: "url(" + iconUrl + ") bottom left no-repeat",
		backgroundSize: "contain"
	})
}
