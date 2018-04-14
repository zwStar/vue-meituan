const userInfo = 'mt-username'

export function getInfo() {
  return localStorage.getItem(userInfo)
}

export function setInfo(username) {
  return localStorage.setItem(userInfo, username)
}

export function removeInfo() {
  return localStorage.removeItem(userInfo)
}

