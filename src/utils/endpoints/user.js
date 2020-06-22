import {get, post} from 'http-service'

const user = {
  profile(data, config = {}) {
    return get('/user/me', {params: {...data}, ...config})
  },
  login(data, config = {}) {
    return post('/user/login', data, {...config})
  },
  signup(data, config = {}) {
    return post('/user/signup', data, {...config})
  },
}

export default user
