import React from "react"
import { readCookie, writeCookie } from "./cookies"

const Language = () => {
  let languageCookie = readCookie("language")
  if (languageCookie == "en" || languageCookie == "fr") {
    return languageCookie
  } else {
    return "en"
  }
}

const SetLanguage = language => {
  writeCookie("language", language)
}

const Translated = React.createContext({
  language: "en"
})

const Translate = locales => {
  return key => (
    <Translated.Consumer>
      {({ language }) => {
        let loc = locales[language]
        let p
        for (let i = 0, p = key.split("."), len = p.length; i < len; i++) {
          loc = loc[p[i]]
        }
        return loc
      }}
    </Translated.Consumer>
  )
}

export { Translate, Translated, SetLanguage }
