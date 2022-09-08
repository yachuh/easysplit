import axios from 'axios'
import { getAuthToken } from './utils'

/* API config */
const baseApiEndpoint = 'https://easysplit.rocket-coding.com/api'
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTAsIkFjY291bnQiOiJ5YWNodWhAZ21haWwuY29tIiwiTmFtZSI6InVjIiwiSW5pdFRpbWUiOiI5LzgvMjAyMiAxMjo1MzoyNiBBTSIsIkV4cCI6IjkvOS8yMDIyIDEyOjUzOjI2IEFNIn0.7epfHxHvT3vrgiznP7t0QcQxDItRPHtmRy94khQ8ce5FsfDFgkIgeBwy7njjdq9rn0CHhTRYghG-lpO7PZ5Hsg' // `Bearer ${getAuthToken()}`
axios.defaults.baseURL = baseApiEndpoint
// axios.defaults.headers.common.Authorization = AUTH_TOKEN

const SINGN_UP = '/User/SignUp'
const LOGIN = '/User/Login'
const GET_PROFILE = '/User/GetProfile'
const EDIT_PROFILE = '/User/EditProfile'
const ACCOUNT_ACTIVATION = '/User/AuthMail/AccountActivation?guid='
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

/* APIs */
const postApi = async (url, payload) => {
  const res = await axios.post(url, payload)
  return toCamelCase(res.data)
}
export const signupApi = (payload) => postApi(SINGN_UP, toUpperCamelCase(payload))
export const loginApi = (payload) => postApi(LOGIN, toUpperCamelCase(payload))
export const accountActivateAPI = (payload) => postApi(ACCOUNT_ACTIVATION, toUpperCamelCase(payload))

const getApi = async (url, token) => {
  const res = await axios.get(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return toCamelCase(res.data)
}

export const getProfileApi = (token) => {
  getApi(GET_PROFILE, token)
}

const putApi = async (url, payload) => {
  const res = await axios.put(url, payload)
  return toCamelCase(res.data)
}

export const editProfileApi = (param) => putApi(`${EDIT_PROFILE}?name=${param}`)
