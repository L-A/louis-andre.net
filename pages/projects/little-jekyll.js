import React from 'react'
import css from 'next/css'
import Blogpost from '~/layouts/blogpost'

export default () => {
	return (
		<Blogpost title="Octobot: Services status squid" titleColor="#cc6633" postMarkdown={postContent}>
			<small className="db lh-copy code gray f6">2015 - Open-source project</small>
		</Blogpost>
)}

const postContent = `
### *Update:* Since Jekyll has recently moved to [gem-based themes](http://jekyllrb.com/news/2016/07/26/jekyll-3-2-0-released/), my method for including an install-less Jekyll conflicts with the direction they are taking.

### It also (in my opinion) adds more obstacles to the learning steps that a beginner might take in learning to build for the web, which goes against the general mission I gave myself with Little Jekyll.

### <3

[Jekyll](http://jekyllrb.com) is a pretty awesome website generator. It makes you manage your content with standard formats, that don't lock you into Jekyll.

### Learning and the command-line barrier

You need minimal knowledge to make use of Jekyll: As soon as you know a bit of Markdown (which really, is just text with some extra punctuation), you can create articles and manage the structure of your site.

Someone who knows a bit of HTML on top of that can modify themes and templates too!

However, Jekyll asks something else of the user: it's only usable through the command-line of the operating system.

A lot of people know about some basics regarding code for the web. Maybe it's HTML, maybe it's CSS. Maybe even Javascript!

What's great about these languages is that they're easy to experiment with: documentation is readily available, tutorials are plenty.

Most importantly, writing some code file and trying it in a browser is _really_ fast, so you can get into these quick loops of trying out something, seeing the result, and doing it over until you've created what you're after.

In comparison, the command-line is a relatively opaque learning process. The terminal is an unforgiving environment, and most importantly, it imposes itself no matter the order in which you actually intend on experimenting. If your tool uses the command line, you have to learn the command line.

So what can I do about that?

### Spreading out learning opportunities

It's why I built Little Jekyll. Simply, it's a graphical interface over Jekyll. By using Little Jekyll, you can abstract the command-line interface for now. This lets you get acquainted with Jekyll's basic functions _real_ fast. I mean it.

> It's a tool built for people to eventually not need it anymore.

It makes it easier to try the _pipeline_ (what you give it, and what it renders in return). At some point, if you like and keep using Jekyll, you'll probably get interested in its more complicated commands anyway. At that point, you'll have outgrown Little Jekyll.

### Useful day-to-day

So for that purpose, I tried to also help with managing multiple sites, and resuming your work in progress. It keeps a list of its managed sites, and restarts servers that were running when it was last closed.

The app also watches the site(s) that are being served, and reloads browser windows when it detects that the site has been modified. Because you're a great person and you deserve it.

Little Jekyll is available [for Linux and Mac OS X](https://github.com/l-a/little-jekyll/releases).
`

const style = css({

})
