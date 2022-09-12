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
