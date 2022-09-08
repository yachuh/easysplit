import { useContext, createContext } from 'react'
import { getAuthToken } from '../utils/utils'

/* 初始值為 null */
export const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}
