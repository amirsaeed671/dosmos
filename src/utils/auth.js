const getUser = () => {
  return sessionStorage.getItem('token')
}

const isLoggedIn = () => {
  const token = getUser()
  return !!token
}

const setUser = token => {
  sessionStorage.setItem('token', token)
}

const removeUser = () => {
  sessionStorage.removeItem('token')
}

export {isLoggedIn, setUser, getUser, removeUser}
