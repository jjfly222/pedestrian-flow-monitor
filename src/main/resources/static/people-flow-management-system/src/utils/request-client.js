import axios from 'axios'
window.isRefreshing = false
const noRefreshURLList = []
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20 * 60 * 1000
})
let requestFailmessage = false
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('logout')) {
      localStorage.clear()
    }
    if (sessionStorage.getItem('refresh_token') && isTokenExpired() && noRefreshURLList.indexOf(config.url) === -1) {
      if (!window.isRefreshing) {
        window.isRefreshing = true
        localStorage.setItem('token', sessionStorage.getItem('refresh_token'))
        localStorage.setItem('expiredTime', sessionStorage.getItem('expiredTime'))
      }
    }
  }
)