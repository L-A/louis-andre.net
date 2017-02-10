import React from 'react'

export default (props) => {
	if (props.shotImageURL) {
		return (
			<a className="pa3 dib w-100 w-third-ns border-box dribbble-link" href={props.linkTo}>
				<img src={props.shotImageURL} width="400"/>
				<style jsx>{`
					a img {
						box-shadow: 0 1px 4px rgba(43,48,59,0.2);
						border: solid 4px #fff;
						transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
					}
					a:hover img {
						box-shadow: 0 6px 8px rgba(43,48,59,0.1);
						transform: translateY(-4px);
					}
				`}</style>
			</a>
		)
	} else {
		return false
	}
}
