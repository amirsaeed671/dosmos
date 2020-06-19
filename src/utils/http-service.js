import axiosInstance from 'api'

const get = (endpoint, data, config = {}) => {
  return axiosInstance.get(endpoint, {params: data, ...config})
}

const post = (endpoint, data, config = {}) => {
  return axiosInstance.post(endpoint, data, config)
}

const put = (endpoint, data, config = {}) => {
  return axiosInstance.put(endpoint, data, config)
}

const patch = (endpoint, data, config = {}) => {
  return axiosInstance.patch(endpoint, data, config)
}

const httpDelete = (endpoint, config = {}) => {
  return axiosInstance.delete(endpoint, config)
}

export {get, post, put, patch, httpDelete}
