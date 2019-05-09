import React from "react"
import { writeCookie } from "./cookies"

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
