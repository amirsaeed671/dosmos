import UserService from 'user'

const isLoggedIn = async () => {
  const user = await UserService.profile()
  return !!user
}

const setUser = token => {
  localStorage.setItem('token', token)
}

const getUser = () => {
  return localStorage.getItem('token')
}

const removeUser = () => {
  localStorage.removeItem('token')
}

const auth = {
  isLoggedIn,
  setUser,
  getUser,
  removeUser,
}

export {auth}
