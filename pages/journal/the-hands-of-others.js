import React from 'react'
import Blogpost from '~/layouts/blogpost'

export default () => {
	return (
		<Blogpost title="The hands of others" titleColor="#473f38" postMarkdown={postContent}>
			<small className="db lh-copy code gray f6">Published in May 2014</small>
			<p><em>Note: this was written a while ago, and some links might have changed since.</em></p>
		</Blogpost>
)}

const postContent = `
How does it feel to run your hands on the surface of something handmade? Maybe it's a novel, a piece of furniture, a jewel – your eyes and your fingers tell you of irregular textures, of rigor and sensibility in the details.

I love the fascinated respect we (or at least, I?) have for the fruit of someone's craft. I love how one can afterwards still touch something and feel the hands that made it. How we catch a glimpse of the human at the other end.

I like to think it's what we're trying to figure out with the web, and with things like mobile devices and the whole "app" construct.

We have touchscreens and cool interactions, but everything feels like it's behind glass (and well, physically, it is!). We try to make things better, and we often over-structure what we display into computerish coldness. Or, for want of skills and sensible priorities, we end up reaching said coldness before we breathe in some natural structure and humanity.

But I see (and hope) that we're getting there. It's in the way [Basecamp](http://www.basecamp.com)'s website is designed: with hand-drawn pictures and a wonky structure, that take nothing from the strength and clarity of their message, but rather infuse it with warmth.

It's in Justin Jackson's classic [This is a web page](http://justinjackson.ca/words.html).

It's in [Frank Chimero](http://frankchimero.com)'s new website too, and in how it's summarized in *The Space Between You and Me*, which he wrote for [The Manual](http://alwaysreadthemanual.com):

> The web is people all the way down.

The more we try to define and use processes that hide this reality, the less genuine it all feels. Hopefully, we'll grow a bit tired of thinking a "handcrafted" web means every pixel in a very rigorous place.

Handcrafting is making something for the hands of others, and putting it out in the world, for others to find, to examine, and to discover the traces we left of ourselves.
`
