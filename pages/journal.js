import { Translate } from "../helpers/translate"

import Link from "next/link"
import Page from "../layout/main"
import Title from "../components/section-title"

const T = Translate({
  fr: {
    intro:
      "J'écris pour m'aider à synthétiser ce que j'apprends. Voici les articles que j'ai mis en ligne (en anglais)."
  },
  en: {
    intro:
      "I write so I can summarize what I learn or reflect on. Here are a few pieces I've put online."
  }
})

const Year = ({ children }) => <Title compact>{children}</Title>

const Post = ({ title, excerpt, slug }) => (
  <Link href={"/journal/" + slug}>
    <a>
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <style jsx>{`
        a {
          display: block;
          text-decoration: none;
          margin: 32px 0;
        }
        h2 {
          font-size: 22px;
          margin-bottom: 8px;
        }
        p {
          color: #6a6d76;
          margin-top: 8px;
          max-width: 36em;
        }
        a:hover h2 {
          text-decoration: underline;
        }
      `}</style>
    </a>
  </Link>
)

export default () => {
  return (
    <Page title="Journal">
      <h1 className="intro">{T("intro")}</h1>
      <Year>2014</Year>
      <Post
        title="The hands of others"
        excerpt="A bit of a love letter to wonkiness and the human touch"
        slug="the-hands-of-others"
      />
      <Post
        title="Kickstart your web app's color palette"
        excerpt="A bit of theory, and a process for getting unstuck"
        slug="web-app-palette"
      />
      <Post
        title="A Retina workflow for Photoshop"
        excerpt="How I designed for 2x screens (in 2014)"
        slug="retina-photoshop"
      />
      <style jsx>{`
        .intro {
          color: #1e2949;
          font-size: 22px;
          font-weight: 500;
          margin: 64px 0 32px;
          max-width: 28em;
        }
      `}</style>
    </Page>
  )
}
