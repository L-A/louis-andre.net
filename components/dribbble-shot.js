import React from 'react'
import Link from 'next/link'

export default (props) => {
	if (props.shotImageURL) {
		return (
			<Link  className="dribbble-link">
				<a className="pa3 fl w-100 w-third-ns border-box" href={props.linkTo}>
					<img src={props.shotImageURL} />
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
			</Link>
		)
	} else {
		return false
	}
}
