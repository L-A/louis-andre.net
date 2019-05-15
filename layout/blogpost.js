import MainLayout from "./main"

export default ({ title, children }) => {
  return (
    <MainLayout overTitle="Journal" overTitleLink="/journal" title={title}>
      <div className="blog-post">{children}</div>
      <style jsx global>{`
        .blog-post {
          font-size: 18px;
          margin-top: 64px;
        }

        .blog-post h2,
        .blog-post h3,
        .blog-post h4,
        .blog-post h5 {
          margin-top: 2em;
          margin-bottom: 0.5em;
        }

        .blog-post p {
          margin: 16px 0;
          max-width: 30em;
        }

        .blog-post img {
          margin: 32px 0;
          max-width: 100%;
        }

        .blog-post a {
          color: #0067a1;
        }

        .blog-post a:hover {
          color: #2200a1;
        }

        .blog-post blockquote {
          border-left: solid 4px #f2f5f8;
          color: #6a6d76;
          font-style: italic;
          margin: 32px 0;
          padding-left: 16px;
        }
      `}</style>
    </MainLayout>
  )
}
