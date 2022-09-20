import axios from 'axios'
import { getAuthToken } from './utils'

/* -- Interceptors -- */
/* axios interceptors: add token to headers */
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      authorization: `Bearer ${getAuthToken()}`
    }
  }
  // console.log('newConfig', newConfig.headers.authorization)
  return newConfig
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/* img interceptors: set content-type to headers */
const imgInstance = axios.create({
  baseURL: 'https://easysplit.rocket-coding.com/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
imgInstance.interceptors.request.use(function (config) {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  return newConfig
}, function (error) {
  return Promise.reject(error)
})

/* -- API config -- */
const baseApiEndpoint = 'https://easysplit.rocket-coding.com/api'
axios.defaults.baseURL = baseApiEndpoint

const SINGN_UP = '/User/SignUp'
const LOGIN = '/User/Login'
const GET_PROFILE = '/User/GetProfile'
const EDIT_PROFILE = '/User/EditProfile'
const ACCOUNT_ACTIVATION_MAIL = '/User/AuthMail/AccountActivation?guid='
const FORGET_PWD = '/User/ForgetPassword'
const RESET_PWD = '/User/ResetPassword'
const RESET_PWD_MAIL = '/User/AuthMail/ResetPassword'
const UPLOAD_AVATAR = '/User/UploadAvatar'
const GETALL = '/Payment/GetAll'
const ADD_BANK = '/Payment/AddBank'
const ADD_CASH = '/Payment/AddCash'
const ADD_LINEPAY = '/Payment/AddLinePay'
const DELETE_BANK = 'Payment/DeleteBank'
const DELETE_LINE = 'Payment/DeleteLine'
const DELETE_CASH = 'Payment/DeleteCash'
const GET_ALL_SETTLEMENT = 'Settlement/GetAllSettlement'
const GET_SETTLEMENT = 'Settlement/GetSettlement'
const GET_PAYMENT_TYPE = 'Settlement/GetPaymentType'
const SETTLEUP = 'Settlement/SettleUp'
const GET_ALL_SETTLED = 'Settlement/GetAllSettled'
const GET_SETTLED_DETAIL = 'Settlement/GetSettledDetail'
const DELETE_SETTLEMENT = 'Settlement/DeleteSettlemet'
const GET_REMINDER = 'Settlement/GetReminder'
const SEND_REMINDER = 'Settlement/SendReminder'
/* Group 相關 */
const GET_ALL_GROUP = '/Group/GetAllGroup'

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

/* -- APIs -- */
/* POST */
const postApi = async (url, payload, config) => {
  const res = await axios.post(url, payload, config)
  return toCamelCase(res.data)
}

const imgPostApi = async (url, payload) => {
  const res = await imgInstance.post(url, payload)
  return toCamelCase(res.data)
}
export const signupApi = (payload) => postApi(SINGN_UP, toUpperCamelCase(payload))
export const loginApi = (payload) => postApi(LOGIN, toUpperCamelCase(payload))
export const accountActivateAPI = (payload) => postApi(ACCOUNT_ACTIVATION_MAIL, toUpperCamelCase(payload))
export const forgetPwdApi = (payload) => postApi(FORGET_PWD, toUpperCamelCase(payload))
export const resetPwdEmailApi = () => postApi(RESET_PWD)
export const uploadAvatarApi = (payload) => imgPostApi(UPLOAD_AVATAR, payload)
export const addBankApi = (payload) => postApi(ADD_BANK, toUpperCamelCase(payload))
export const addCashApi = (payload) => postApi(ADD_CASH, toUpperCamelCase(payload))
export const addLinePayApi = (payload) => postApi(ADD_LINEPAY, toUpperCamelCase(payload))
export const settleUpApi = (payload) => postApi(SETTLEUP, toUpperCamelCase(payload))
export const sendReminderApi = (payload) => postApi(SEND_REMINDER, toUpperCamelCase(payload))

/* GET */
const getApi = async (url) => {
  const res = await axios(url)
  return toCamelCase(res.data)
}

export const getProfileApi = () => getApi(GET_PROFILE)
export const getPaymentAllApi = () => getApi(GETALL)

// 5.X 須將後面數字改變數 ${param}，測試功能暫寫死
export const getGroupAllSettlementApi = (param) => getApi(`${GET_ALL_SETTLEMENT}/11`)
export const getPersonalSettlementApi = (param) => getApi(`${GET_SETTLEMENT}/21`)
export const getPaymentTypeApi = () => getApi(GET_PAYMENT_TYPE)
export const getAllSettledApi = (param) => getApi(`${GET_ALL_SETTLED}/11`)
export const getSettledDetailApi = (param) => getApi(`${GET_SETTLED_DETAIL}10`)
export const getReminderApi = (param) => getApi(`${GET_REMINDER}/21`)

// Group 相關
export const getAllGroupApi = () => getApi(GET_ALL_GROUP)

/* PUT */
const putApi = async (url, payload) => {
  const res = await axios.put(url, payload)
  return toCamelCase(res.data)
}

export const editProfileApi = (param) => putApi(`${EDIT_PROFILE}?name=${param}`)
export const resetPwdApi = (payload) => putApi(RESET_PWD_MAIL, toUpperCamelCase(payload))

/* DELETE */
const deleteApi = async (url, payload) => {
  console.log(url)
  const res = await axios.delete(url, payload)
  return toCamelCase(res.data)
}

export const deleteBankApi = (param) => deleteApi(`${DELETE_BANK}/${param}`)
export const deleteLineApi = (param) => deleteApi(`${DELETE_LINE}/${param}`)
export const deleteCashApi = (param) => deleteApi(`${DELETE_CASH}/${param}`)

// 5.X 須將後面數字改變數 ${param}，測試功能暫寫死
export const deleteSettlemetApi = (param) => deleteApi(`${DELETE_SETTLEMENT}/${param}`)
