import React from 'react'
import BlogPost from 'layouts/blogpost'

export default () => (
	<BlogPost title="Fitsteady: Fantastic tools for formidable trainers" titleColor="#459283" postMarkdown={postContent}>
	<small className="db lh-copy code gray f6">2013 - Designed and built at Hookt Studios</small>
	</BlogPost>
)

const postContent = `
![Fitsteady's app design is meant to be accessible from any phone](/static/images/fitsteady-post/app-screenshots.png)

### Fitsteady (which I'll call [Wellshift](http://wellshift.com/) from here on, because they've since rebranded) offer health & wellness programs to large organizations. They hired us to quickly build tools that automate some of their trainers' tasks, and pick up valuable feedback from attendees.

## Schedules and attendance

We built a focused web app that trainers can use to list their upcoming sessions, and take attendance when it's time.

I designed the application's flow so that valuable information is quickly accessible. The first thing a trainer sees is the schedule for upcoming sessions. Similarly, when it's time to take attendance, the work is done for them as much as possible: There is a pre-made list for every session, and trainers simply check attendees and tap "done".

![Fast attendance for busy trainers!](/static/images/fitsteady-post/attendance-flow.png)

## Post-training survey

To refine how they impact health and wellness over time, Wellshift wanted to keep track of how effective each session is.

I designed a follow-up email to be sent to attendees after a session, which leads to a one-page survey. A generic version is available, but common activities are presented with a custom message and a mascot.

![Fitsteady's survey email](/static/images/fitsteady-post/emails.png)

Melanie Weinberger (Wellshift's Founder & CEO) took charge of copywriting, and throughout the project provided us with consistently quirky text. We were _on board_ with that.

I made the visual treatment complement this, leading up to a personality that's, ahem, _rather_ enthusiastic. It balances itself out by being efficient! Compliments and celebration are encouraged, but they never add time or steps to a task.

![Fitsteady's survey layout](/static/images/fitsteady-post/survey.png)

At the time of writing (three years later already!) Fitsteady have steadily established their position as a major provider of health & wellness for organizations in Austin, TX.
`
