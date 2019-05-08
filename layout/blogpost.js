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
          max-width: 32em;
        }

        .blog-post img {
          margin: 32px 0;
          max-width: 100%;
        }

        .blog-post a {
          color: #0067a1;
        }
      `}</style>
    </MainLayout>
  )
}
