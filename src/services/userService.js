import axios from 'axios'
import cookieService from './cookieService'
const url = `https://todolist-api.hexschool.io`

function signup(userInfo) {
  return axios.post(`${url}/users/sign_up`, userInfo)
}
function login(userData) {
  return axios.post(`${url}/users/sign_in`, userData)
}
function verify() {
  return axios.get(`${url}/users/checkout`, {
    headers: {
      Authorization: cookieService.getCookie('todoToken')
    }
  })
}

function logout() {
  return axios.post(`${url}/users/sign_out`, null, {
    headers: {
      Authorization: cookieService.getCookie('todoToken')
    }
  })
}

const userService = {
  signup,
  login,
  verify,
  logout
}

export default userService
