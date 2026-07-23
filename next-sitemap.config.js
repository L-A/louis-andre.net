/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://louis-andre.net',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    transformRobotsTxt: (_, robotsTxt) => {
      // Preserve AI-bot disallow rules in the generated robots.txt
      const aiBotRules = [
        'User-agent: GPTBot',
        'Disallow: /',
        'User-agent: ChatGPT-User',
        'Disallow: /',
        'User-agent: Google-Extended',
        'Disallow: /',
        'User-agent: CCBot',
        'Disallow: /',
      ].join('\n');

      return `${robotsTxt}\n${aiBotRules}\n`;
    },
  },
}
