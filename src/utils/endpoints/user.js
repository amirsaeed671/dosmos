import {get, post} from 'http-service'

const user = {
  profile(data, config = {}) {
    get('/user/me', data, {...config})
  },
  login(data, config = {}) {
    post('/user/login', data, {...config})
  },
  signup(data, config = {}) {
    post('/user/signup', data, {...config})
  },
}

export default user
