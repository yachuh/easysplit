import axios from 'axios'
import { getAuthToken } from './utils'

/* Interceptors: addgin token to header */
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      authorization: `Bearer ${getAuthToken()}`
    }
  }
  console.log('newConfig', newConfig.headers.authorization)
  return newConfig
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/* API config */
const baseApiEndpoint = 'https://easysplit.rocket-coding.com/api'
axios.defaults.baseURL = baseApiEndpoint

const SINGN_UP = '/User/SignUp'
const LOGIN = '/User/Login'
const GET_PROFILE = '/User/GetProfile'
const EDIT_PROFILE = '/User/EditProfile'
const ACCOUNT_ACTIVATION_MAIL = '/User/AuthMail/AccountActivation?guid='
const RESET_PWD = '/User/ResetPassword'
const RESET_PWD_MAIL = '/User/AuthMail/ResetPassword'
const UPLOAD_AVATAR = '/User/UploadAvatar'
const GETALL = '/Payment/GetAll'

/**
 * input an object with any keys
 * output an object with key in camel case
 */
/*
1. payload = { account: 'a', password: 'b' }
2. keys = ['account', 'password']
3. reduce
  1. capitalize account => Account
  2. get payload['account'] value => 'a'
  3. add attribute Account with value 'a'
  4. accumulate 3. into result
  5. repeat 1~4 from keys
*/
const toUpperCamelCase = (payload) => {
  const keys = Object.keys(payload)
  const capitalize = (word) => word && word.length > 1 ? `${word[0].toUpperCase()}${word.substring(1)}` : word
  const result = keys.reduce((result, currentKey) => {
    return {
      ...result,
      [capitalize(currentKey)]: payload[currentKey]
    }
  }, {})
  return result
}

const toCamelCase = (payload) => {
  const keys = Object.keys(payload)
  const capitalize = (word) => word && word.length > 1 ? `${word[0].toLowerCase()}${word.substring(1)}` : word
  const result = keys.reduce((result, currentKey) => {
    return {
      ...result,
      [capitalize(currentKey)]: payload[currentKey]
    }
  }, {})
  return result
}

/* --- APIs --- */
/* POST */
const postApi = async (url, payload) => {
  const res = await axios.post(url, payload)
  return toCamelCase(res.data)
}
export const signupApi = (payload) => postApi(SINGN_UP, toUpperCamelCase(payload))
export const loginApi = (payload) => postApi(LOGIN, toUpperCamelCase(payload))
export const accountActivateAPI = (payload) => postApi(ACCOUNT_ACTIVATION_MAIL, toUpperCamelCase(payload))
export const resetPwdEmailApi = () => postApi(RESET_PWD)
export const uploadAvatarApi = () => postApi(UPLOAD_AVATAR)

/* GET */
const getApi = async (url) => {
  const res = await axios(url)
  return toCamelCase(res.data)
}

export const getProfileApi = () => getApi(GET_PROFILE)
export const getPaymentAllApi = () => getApi(GETALL)

/* PUT */
const putApi = async (url, payload) => {
  const res = await axios.put(url, payload)
  return toCamelCase(res.data)
}

export const editProfileApi = (param) => putApi(`${EDIT_PROFILE}?name=${param}`)
export const resetPwdApi = (payload) => putApi(RESET_PWD_MAIL, toUpperCamelCase(payload))
