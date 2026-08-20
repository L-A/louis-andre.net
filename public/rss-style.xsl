<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="rss/channel/title"/></title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          * {
            box-sizing: border-box;
            color: #000d3a;
            font-family: Helvetica, Arial, sans-serif;
            line-height: 1.5;
          }

          body {
            margin: 0;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f0f0f0;
          }

          .rss-info {
            border-radius: 8px;
            margin: 2em 0;
            font-size: 0.85em;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-between;
          }

          .rss-info p {
            color: #667;
            flex: 1 1 120px;
            margin: 0;
          }

          .rss-info .feed-link {
            border: 1px solid #2429c1;
            color: #2429c1;
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

          .feed-link:hover {
            background-color: color-mix(in srgb, #E8F6FC 20%, #fff);
          }

          .container {
            padding: 2em;
            background-color: #fff;
            border-radius: .25em;
          }

          .header {
            border-bottom: 1px solid #DDD;
            padding-bottom: 0.5em;
          }

          .feed-title {
            font-size: 1.15em;
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
            margin: 0.15em 0;
          }

          .rss-info strong {
            color: #2429c1;
          }

          .item {
            margin: 1em 0;
            padding-top: 1em;
          }

          .item-title {
            font-size: 1em;
            font-weight: bold;
            margin: 0;
          }

          .item-title a {
            line-height: 1.1;
            text-decoration-color: transparent;
            text-decoration-style: solid;
            transition: text-decoration-color 0.3s ease;
          }

          .item-title a:hover {
            text-decoration-color: #2429c1;
          }

          .item-description {
            font-size: 0.8125em;
            margin: 0.5em 0;
            color: #333;
            line-height: 1.4;
          }

          .item-meta {
            font-size: 0.8em;
            color: #666;
            margin-top: 0.5em;
            font-weight: 500;
          }

          .item-link {
            margin-right: 1em;
            color: #2429c1;
            font-size: 1em;
            text-decoration-color: #E8F6FC;
            text-decoration-style: solid;
            transition: text-decoration-color 0.3s ease;
          }

          .item-link:hover {
            text-decoration-color: #2429c1;
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
              padding: 0.25em;
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
