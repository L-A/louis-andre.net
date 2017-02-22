import React from 'react'
import Link from 'next/prefetch'

export default () =>
<footer className="ph3 pv4 ph5-m ph6-l mt6 washed-blue">
	<div className="pt4 with-divider">
		<Link href="/le-scanneur">
			<a className="f3 db pb2 b link">Le Scanneur</a>
		</Link>
		<Link href="/journal/retina-photoshop">
			<a className="f3 db b link">A Retina workflow for Photoshop</a>
		</Link>
	</div>
	<ul className="dib list f5 code mv4 pa0 pr3 pr5-m pr6-l">
		<li className="dib pr3 with-side-divider">
			<Link href="/">
				<a className="link">home</a>
			</Link>
		</li>
		<li className="dib ph3 with-side-divider">
			<Link href="/about">
				<a className="link">about</a>
			</Link>
		</li>
		<li className="dib ph3 with-side-divider">
			<Link href="/journal">
				<a className="link">journal</a>
			</Link>
		</li>
		<li className="dib pl3">
			<Link href="/contact">
				<a className="link">contact</a>
			</Link>
		</li>
	</ul>
	<small className="db light-silver">© {new Date().getFullYear()} Louis-André Labadie. Thanks for passing by!</small>
	<style jsx>
		{`
				a {
					color: #9195b4;
				}
				a:hover {
					color: #253181;
				}
				.with-divider {
					border-top: 2px solid rgba(0,0,0,0.08);
				}
				.with-side-divider {
					border-right: 2px solid rgba(0,0,0,0.08);
				}
		`}
	</style>
</footer>
