<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="rss/channel/title"/></title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="/styles/work-sans.css"/>
        <style>
          * {
            box-sizing: border-box;
            color: #000d3a;
            font-family: "Work Sans", Helvetica, Arial, sans-serif;
            line-height: 1.5;
          }

          body {
            margin: 0;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #E8F6FC;
          }

          .rss-info {
            background-color: #E8F6FC;
            border-radius: 8px;
            margin: 2em 0;
            font-size: 0.9em;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-between;
          }

          .rss-info p {
            color: #668;
            flex: 1 1 120px;
            margin: 0;
          }

          .rss-info .feed-link {
            background-color: #1BA3DE;
            color: white;
            display: block;
            text-decoration: none;
            text-align: center;
            font-size: 1em;
            padding: 0.5em 1em;
            margin-left: 1em;
            border-radius: 0.25em;
            transition: background-color 0.3s ease;
            flex: 0 0 160px;
          }

          .container {
            padding: 2em;
            background-color: #fff;
            border: solid 1px #E8F6FC;
            border-radius: .5em;
          }

          .header {
            border-bottom: 2px solid #E8F6FC;
            padding-bottom: 1em;
          }

          .feed-title {
            font-size: 32px;
            font-weight: 800;
            color: #000d3a;
            margin-top: 0;
            margin-bottom: 0;
            line-height: 1.1;
            text-decoration: none;
          }

          .feed-description {
            font-size: 1em;
            color: #666;
            margin: 0.25em 0;
          }

          .feed-link:hover {
            background-color: color-mix(in srgb, #E8F6FC 20%, #1BA3DE);
          }

          .rss-info strong {
            color: #1BA3DE;
          }

          .item {
            margin: 1em 0;
            padding-bottom: 1em;

          }

          .item-title {
            font-size: 1.2em;
            font-weight: bold;
            margin: 0;
          }

          .item-title a {
            color: #1BA3DE;
            line-height: 1.2;
            text-decoration-color: transparent;
            text-decoration-style: solid;
            transition: text-decoration-color 0.3s ease;
          }

          .item-title a:hover {
            text-decoration-color: #1BA3DE;
          }

          .item-description {
            font-size: 0.9em;
            margin: 0.25em 0;
            color: #333;
            line-height: 1.4;
          }

          .item-meta {
            font-size: 0.8em;
            color: #666;
            margin-top: 0.5em;
            font-weight: 300;
          }

          .item-link {
            margin-right: 1em;
            color: #1BA3DE;
            font-size: 1em;
            text-decoration-color: #E8F6FC;
            text-decoration-style: solid;
            transition: text-decoration-color 0.3s ease;
          }

          .item-link:hover {
            text-decoration-color: #1BA3DE;
          }

          @media (max-width: 600px) {
            body {
              padding: 8px;
            }

            .container {
                padding: 2em 1em;
            }

            .feed-title {
              font-size: 24px;
            }

            .item-title {
              font-size: 1em;
            }

            .item-link {
              padding: 0.25em 0.5em;
            }
          }
        </style>
      </head>
      <body>
        <div class="rss-info">
            <p><strong>📡 This is my journal's RSS feed</strong> - Subscribe to it with your RSS reader and you'll receive my posts when they're published.</p>
            <a class="feed-link" href="{rss/channel/link}">Visit my website</a>
        </div>

        <div class="container">
            <div class="header">
                <h1 class="feed-title"><xsl:value-of select="rss/channel/title"/></h1>
                <p class="feed-description"><xsl:value-of select="rss/channel/description"/></p>
            </div>


            <div class="items">
                <xsl:for-each select="rss/channel/item">
                    <article class="item">
                    <h2 class="item-title">
                        <a href="{link}"><xsl:value-of select="title"/></a>
                    </h2>
                    <div class="item-description">
                        <xsl:value-of select="description"/>
                    </div>
                    <div class="item-meta">
                        <a class="item-link" href="{link}">Full post</a>
                        Published: <xsl:value-of select="pubDate"/>
                    </div>
                    </article>
                </xsl:for-each>
            </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
