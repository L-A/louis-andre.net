const writeCookie = (name, value) => {
  document.cookie = name + "=" + value + "; path=/"
}

const readCookie = (name, req = false) => {
  let cookieString = ""
  let namePrefix = name + "="

  if (req) {
    cookieString = req.headers.cookie
  } else {
    cookieString = document.cookie
  }

  if (cookieString == undefined) { return null } 

  let cookieArray = cookieString.split(';')

  for (var i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) == " ") cookie = cookie.substring (1)
    if ( cookie.indexOf(namePrefix) == 0 ) return cookie.substring (namePrefix.length)
	}
  return null
}

export { writeCookie, readCookie }
