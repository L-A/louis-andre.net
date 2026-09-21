import { readdirSync, readFileSync } from "node:fs";

const journalDir = new URL("../../content/journal/", import.meta.url);
const frenchJournalIds = new Set(
  readdirSync(journalDir)
    .filter((name) => /\.mdx?$/.test(name))
    .filter((name) =>
      /^lang:\s*['"]?fr['"]?\s*$/m.test(
        readFileSync(new URL(name, journalDir), "utf8"),
      ),
    )
    .map((name) => name.replace(/\.mdx?$/, "")),
);

const urlHasContentLang = (page) => {
  const { pathname } = new URL(page);
  const frArticle = pathname.match(/^\/fr\/journal\/([^/]+)\/?$/);
  if (frArticle) return frenchJournalIds.has(decodeURIComponent(frArticle[1]));
  const enArticle = pathname.match(/^\/journal\/([^/]+)\/?$/);
  if (enArticle) return !frenchJournalIds.has(decodeURIComponent(enArticle[1]));
  return true;
};

export { frenchJournalIds, urlHasContentLang };
