import React from 'react'
import Blogpost from 'layouts/blogpost'

export default () => {
	return (
		<Blogpost title="Octobot: Services status squid" titleColor="#cc6633" postMarkdown={postContent}>
			<small className="db lh-copy code gray f6">2014 - Development by Jean-Philippe Couture</small>
		</Blogpost>
)}

const postContent = `
![Octobot says hello](/static/images/octobot-post/octobot-squid.jpg)

### Octobot lives silently on your phone, and notifies you the second Github's services go down or experience a problem.

## The app

The concept was discussed with Jean-Philippe Couture in 2014 as part of a short Hackathon at Mirego. I partnered up as designer and general web guy.

Octobot is, by all measures, a micro-app. The design respects this by giving personality to the short interactions offered.

The first task was to put the app's different states on paper and confirm that we agree on the structure and flow.

![Initial sketches](/static/images/octobot-post/sketches.jpg)

A first round of design was made to establish the app's aesthetic treatment and start providing assets to build up the prototype's visuals.

![First round of design](/static/images/octobot-post/round-1.jpg)

As we were working on it, Apple released support for PDF assets. The scope and self-directed nature of the project lent itself very well to experimentation, so at Jean-Philippe's request, I produced a different set of assets – PDF this time. They had to eschew the initial style in a few ways. Noisy shadows, for example, were problematic to render.

I used the occasion to review the general look. It turned out that the simpler treatment is a better way to communicate the playfulness of the app.

![New direction, adjusted for PDF assets](/static/images/octobot-post/round-2.jpg)

This design has been in use since public release. When a new state is retrieved, the corresponding flag flips and clicks satisfyingly in place. Jean-Philippe worked on the spring physics and I produced the _"Thack!"_ sound for it.

## Material

Octobot has a sort of mascot, which doubles as the app icon on devices.

The icon was developed first as a stand-alone simplified version, and integrated to the app's different icon applications.

![Icon declinations](/static/images/octobot-post/icons.jpg)

Then as part of a small round of marketing effort, I refined it for larger-scale use. Among these, wallpapers.

![Wallpaper](/static/images/octobot-post/more-details.jpg)
`
