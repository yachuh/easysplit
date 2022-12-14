import axios from 'axios'
import { getAuthToken } from './utils'

/**
 * ==== Interceptors ====
 */

// axios interceptors: add token to headers
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

// img interceptors: set content-type to headers
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

/**
 * ==== API config ====
 */

const baseApiEndpoint = 'https://easysplit.rocket-coding.com/api'
axios.defaults.baseURL = baseApiEndpoint

// user 相關
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
const DELETE_BANK = '/Payment/DeleteBank'
const DELETE_LINE = '/Payment/DeleteLine'
const DELETE_CASH = '/Payment/DeleteCash'
const ADD_LINEPAY_QRCODE = '/Payment/AddLinePayQRcode'

// group 相關
const GET_ALL_GROUP = '/Group/GetAllGroup'
const GET_A_GROUP = '/Group/GetAGroup'
const ADD_GROUP = '/Group/AddGroup'
const ADD_GROUP_COVER = '/Group/AddGroupCover'
const EDIT_GROUP = '/Group/EditGroup'
const EDIT_GROUP_COVER = '/Group/EditGroupCover'
const DELETE_GROUP = '/Group/DeleteGroup'
const GET_ALL_MEMBER = '/Group/GetAllMember'
const ADD_MEMBER = '/Group/AddMember'
const CHANGE_MEMBER_ROLE = '/Group/ChangeMemberRole'
const EDIT_MEMBER = '/Group/EditMember'
const DELETE_MEMBER = '/Group/DeleteMember'
const GET_GROUP_INVITAION = '/Group/SendInviteMail'

// expense 相關
const GET_EXPENSE_TYPE = '/Expense/GetExpenseType'
const GET_ALL_EXPENSE = '/Expense/GetAllExpense'
const GET_EXPENSE = '/Expense/GetExpense'
const ADD_EXPENSE = '/Expense/AddExpense'
const ADD_EXPENSE_IMG = '/Expense/AddExpensePhotos'
const EDIT_EXPENSE = '/Expense/EditExpense'
const EDIT_EXPENSE_IMG = '/Expense/EditExpenseImage'
const DELETE_EXPENSE = '/Expense/DeleteExpense'

// settle 相關
const GET_ALL_SETTLEMENT = '/Settlement/GetAllSettlement'
const GET_SETTLEMENT = '/Settlement/GetSettlement'
const GET_PAYMENT_TYPE = '/Settlement/GetPaymentType'
const SETTLEUP = '/Settlement/SettleUp'
const GET_ALL_SETTLED = '/Settlement/GetAllSettled'
const GET_SETTLED_DETAIL = '/Settlement/GetSettledDetail'
const DELETE_SETTLEMENT = '/Settlement/DeleteSettlemet'
const GET_REMINDER = '/Settlement/GetReminder'
const SEND_REMINDER = '/Settlement/SendReminder'
const GET_SELF_SETTLEMENT = '/Settlement/GetSelfSettlement'
const SETTLEUP_IMAGE = '/Settlement/SettleUpImage'

// 通知 相關
const GET_ALL_NOTIFICATION = '/Notification/GetAllNotification'

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

/**
 * ==== APIs ====
 */

/* ---- POST ---- */
const postApi = async (url, payload, config) => {
  const res = await axios.post(url, payload, config)
  return toCamelCase(res.data)
}

// use imgPostApi when uploading images
const imgPostApi = async (url, payload) => {
  const res = await imgInstance.post(url, payload)
  return toCamelCase(res.data)
}

// user 相關 api
export const signupApi = (payload) => postApi(SINGN_UP, toUpperCamelCase(payload))
export const loginApi = (payload) => postApi(LOGIN, toUpperCamelCase(payload))
export const accountActivateAPI = (payload) => postApi(ACCOUNT_ACTIVATION_MAIL, toUpperCamelCase(payload))
export const forgetPwdApi = (payload) => postApi(FORGET_PWD, toUpperCamelCase(payload))
export const resetPwdEmailApi = () => postApi(RESET_PWD)
export const uploadAvatarApi = (formData) => imgPostApi(UPLOAD_AVATAR, formData)
export const addBankApi = (payload) => postApi(ADD_BANK, toUpperCamelCase(payload))
export const addCashApi = (payload) => postApi(ADD_CASH, toUpperCamelCase(payload))
export const addLinePayApi = (payload) => postApi(ADD_LINEPAY, toUpperCamelCase(payload))
export const addLinePayQRcodeApi = (formData) => imgPostApi(ADD_LINEPAY_QRCODE, formData)

// group 相關 api
export const addGroupApi = (payload) => postApi(ADD_GROUP, toUpperCamelCase(payload))
export const addGroupCoverApi = (formData) => imgPostApi(ADD_GROUP_COVER, formData)
export const editGroupCoverApi = (formData) => imgPostApi(EDIT_GROUP_COVER, formData)
export const addMemberApi = (payload) => postApi(ADD_MEMBER, toUpperCamelCase(payload))
export const getGroupInvitationApi = (groupId) => postApi(`${GET_GROUP_INVITAION}/${groupId}`)

// expense 相關 api
export const addExpenseApi = (payload) => postApi(ADD_EXPENSE, toUpperCamelCase(payload))
export const addExpenseImgApi = (formData) => imgPostApi(ADD_EXPENSE_IMG, formData)
export const editExpenseImgApi = (formData) => imgPostApi(EDIT_EXPENSE_IMG, formData)

// settle 相關 api
export const settleUpApi = (payload) => postApi(SETTLEUP, toUpperCamelCase(payload))
export const sendReminderApi = (payload) => postApi(SEND_REMINDER, toUpperCamelCase(payload))
export const settleUpImageApi = (formData) => imgPostApi(SETTLEUP_IMAGE, formData)

/* ---- GET ---- */
const getApi = async (url) => {
  const res = await axios(url)
  return toCamelCase(res.data)
}

export const getProfileApi = () => getApi(GET_PROFILE)
export const getPaymentAllApi = () => getApi(GETALL)

// Settlement 相關 api
export const getGroupAllSettlementApi = (param) => getApi(`${GET_ALL_SETTLEMENT}/${param}`)
export const getPersonalSettlementApi = (param) => getApi(`${GET_SETTLEMENT}/${param}`)
export const getPaymentTypeApi = () => getApi(GET_PAYMENT_TYPE)
export const getSettledDetailApi = (param) => getApi(`${GET_SETTLED_DETAIL}/${param}`)
export const getReminderApi = (param) => getApi(`${GET_REMINDER}/${param}`)
export const getSelfSettlementApi = (param) => getApi(`${GET_SELF_SETTLEMENT}/${param}`)
export const getAllSettledApi = (groupId) => getApi(`${GET_ALL_SETTLED}/${groupId}`)

// group 相關 api
export const getAllGroupApi = () => getApi(GET_ALL_GROUP)
export const getAGroupApi = (groupId) => getApi(`${GET_A_GROUP}/${groupId}`)
export const getAllMemberApi = (groupId) => getApi(`${GET_ALL_MEMBER}/${groupId}`)

// expense 相關 api
export const getExpenseTypeApi = () => getApi(GET_EXPENSE_TYPE)
export const getAllExpenseApi = (groupId) => getApi(`${GET_ALL_EXPENSE}/${groupId}`)
export const getExpenseApi = (expenseId) => getApi(`${GET_EXPENSE}/${expenseId}`)

// 通知 相關
export const getAllNotificationApi = () => getApi(GET_ALL_NOTIFICATION)

/* ---- PUT ---- */
const putApi = async (url, payload) => {
  const res = await axios.put(url, payload)
  return toCamelCase(res.data)
}

export const editProfileApi = (param) => putApi(`${EDIT_PROFILE}?name=${param}`)
export const resetPwdApi = (payload) => putApi(RESET_PWD_MAIL, toUpperCamelCase(payload))

// group 相關 api
export const editGroupApi = (payload) => putApi(EDIT_GROUP, toUpperCamelCase(payload))
export const editMemberApi = (payload) => putApi(EDIT_MEMBER, toUpperCamelCase(payload))
export const changeMemberRoleApi = (memberId) => putApi(`${CHANGE_MEMBER_ROLE}/${memberId}`)

// expense 相關 api
export const editExpenseApi = (payload) => putApi(EDIT_EXPENSE, toUpperCamelCase(payload))

/* ---- DELETE ---- */
const deleteApi = async (url) => {
  const res = await axios.delete(url)
  return toCamelCase(res.data)
}

export const deleteBankApi = (param) => deleteApi(`${DELETE_BANK}/${param}`)
export const deleteLineApi = (param) => deleteApi(`${DELETE_LINE}/${param}`)
export const deleteCashApi = (param) => deleteApi(`${DELETE_CASH}/${param}`)

// group 相關 api
export const delGroupApi = (groupId) => deleteApi(`${DELETE_GROUP}/${groupId}`)
export const delMemberApi = (memberId) => deleteApi(`${DELETE_MEMBER}/${memberId}`)

// expense 相關 api
export const delExpenseApi = (expenseId) => deleteApi(`${DELETE_EXPENSE}/${expenseId}`)

// Settlement 相關 api
export const deleteSettlemetApi = (param) => deleteApi(`${DELETE_SETTLEMENT}/${param}`)
