import axios from 'axios'

const baseAPIEndpoint = 'https://easysplit.rocket-coding.com/api'
axios.defaults.baseURL = baseAPIEndpoint

const SINGN_UP = '/User/SignUp'
const LOGIN = '/User/Login'

const postApi = (url, payload) => axios.post(url, payload)
export const signupApi = ({ name, account, password }) => postApi(SINGN_UP,
  {
    Name: name.trim(),
    Account: account,
    Password: password.trim()
  })
export const loginApi = ({ account, password }) => postApi(LOGIN,
  {
    Account: account,
    Password: password.trim()
  })
