import React from 'react'

export default (props) => {
	return (
		<span style={style(props.iconName, props.width, props.height)} className={"icon " + props.iconName}></span>
	)
}

const icons = [
	{
		name: "dribbble",
		url: "/static/images/icons/icon_dribbble.svg",
		height: "1.2em",
		width: "1.2em"
	},
	{
		name: "cases",
		url: "/static/images/icons/icon_case_studies.svg",
		height: "0.9em",
		width: "1.9em"
	},
	{
		name: "radio",
		url: "/static/images/icons/icon_radio.svg",
		height: "1.6em",
		width: "1.4em"
	},
	{
		name: "music",
		url: "/static/images/icons/icon_music.svg",
		height: "1.4em",
		width: "1.4em"
	},
	{
		name: "chevron",
		url: "/static/images/icons/icon_chevron.svg",
		height: "1.4em",
		width: "1.6em"
	},
]

const style = (iconName) => {
	let iconUrl, height, width
	icons.forEach((icon) => {
		if (icon.name == iconName) {
			iconUrl = icon.url
			height = icon.height
			width = icon.width
		}
	})

	return {
		display: "inline-block",
		height: height,
		marginLeft: "0.4em",
		width: width,
		background: "url(" + iconUrl + ") center no-repeat",
		backgroundSize: "contain",
		verticalAlign: "baseline"
	}
}
