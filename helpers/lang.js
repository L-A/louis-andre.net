import { readCookie, writeCookie } from '~/helpers/cookie'

const Translate = (locales) => {
  const Key = (path) => {
    let loc = locales[Language()]
    let p
    for (let i=0, p=path.split('.'), len=p.length; i<len; i++){
     loc = loc[p[i]]
    }
    return loc
  }
  return { Key }
}

const Language = () => {
  let langCookie = readCookie("lang")

  if (langCookie == "en" || langCookie == "fr") {
    return langCookie
  } else {
    return "en"
  }

}

const SetLanguage = (lang) => {
  writeCookie("lang", lang)
}

export { Translate, SetLanguage, Language }
