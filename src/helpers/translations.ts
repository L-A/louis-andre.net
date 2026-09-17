import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n";
import { defaultLang, ui } from "../i18n/ui.ts";

type Lang = keyof typeof ui;
type TranslationKey = keyof (typeof ui)[typeof defaultLang];
type Translations = Record<string, string>;

const locales = Object.keys(ui);

const getLocale = (currentLocale?: string): Lang =>
  (currentLocale && currentLocale in ui ? currentLocale : defaultLang) as Lang;

const stripLocalePrefix = (pathname: string, locale: string) => {
  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped.replace(/^\//, "");
};

const getBarePath = (pathname: string, currentLocale?: string): string => {
  const locale = getLocale(currentLocale);
  return "/" + stripLocalePrefix(pathname, locale);
};

const getLocaleAlternates = (pathname: string, locale: string) => {
  const bare = stripLocalePrefix(pathname, locale);
  return locales.map((l) => ({
    hreflang: l,
    href: getAbsoluteLocaleUrl(l, bare),
  }));
};

const useTranslations = (currentLocale?: string) => {
  const locale = getLocale(currentLocale);
  const localized = ui[locale] as Translations;
  const fallback = ui[defaultLang] as Translations;

  const t = (key: TranslationKey): string => localized[key] ?? fallback[key];
  const url = (path = "") =>
    getRelativeLocaleUrl(locale, path.replace(/^\//, ""));

  return { locale, t, url };
};

export {
  getLocale,
  getBarePath,
  getLocaleAlternates,
  stripLocalePrefix,
  useTranslations,
};
