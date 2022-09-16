import { useContext, createContext } from 'react'

/* User Profile 頁的 data */
export const UserDataContext = createContext({
  account: '',
  name: '',
  image: ''
})

export const useUserData = () => {
  return useContext(UserDataContext)
}

/* User Profile payment 頁的 paydata */
export const PayDataContext = createContext({
  bank: [],
  cash: [],
  line: []
})

export const usePayData = () => {
  return useContext(PayDataContext)
}
