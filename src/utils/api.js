import axios from 'axios'
import {getUser, isLoggedIn} from 'auth'

const baseURL = 'https://dosmos-backend.herokuapp.com/'

const axiosInstance = axios.create({baseURL})

axiosInstance.interceptors.request.use(
  function requestCB(config) {
    if (isLoggedIn()) {
      const token = getUser()
      config.headers.token = token
    }
    return config
  },
  function reqErrorCB(error) {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  function responseCB(response = {}) {
    return response.data
  },
  function resErrorCB(error) {
    return Promise.reject(error)
  },
)

export default axiosInstance
