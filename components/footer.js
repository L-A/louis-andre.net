import React from 'react'
import Link from 'next/prefetch'
import { Translate, Language, SetLanguage } from '~/helpers/lang'

const T = Translate({
  en: {
    nav: {
			home: "home",
			about: "about",
			journal: "journal",
			contact: "contact"
		},
		copy_thanks: "Louis-André Labadie. Thanks for passing by!"
  },
	fr: {
    nav: {
			home: "accueil",
			about: "à propos",
			journal: "journal",
			contact: "contact"
		},
		copy_thanks: "Louis-André Labadie. Merci de visiter!"
  }
})

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
	<ul className="dib list f6 f5-ns code mv4 pa0 pr3 pr5-m pr6-l">
		<li className="dib pr2 pr3-ns mv1 with-side-divider">
			<Link href="/">
				<a className="link">
					{T.Key("nav.home")}
				</a>
			</Link>
		</li>
		<li className="dib ph2 ph3-ns mv1 with-side-divider">
			<Link href="/about">
				<a className="link">
					{T.Key("nav.about")}
				</a>
			</Link>
		</li>
		<li className="dib ph2 ph3-ns mv1 with-side-divider">
			<Link href="/journal">
				<a className="link">
					{T.Key("nav.journal")}
				</a>
			</Link>
		</li>
		<li className="dib pl2 pl3-ns mv1">
			<Link href="/contact">
				<a className="link">
					{T.Key("nav.contact")}
				</a>
			</Link>
		</li>
	</ul>
	<small className="db light-silver">© {new Date().getFullYear()} {T.Key("copy_thanks")}</small>
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
