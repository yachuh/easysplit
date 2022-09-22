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

/* Group 頁的 groupData */
export const GroupDataContext = createContext({
  id: '',
  name: '',
  imageUrl: ''
})

export const useGroupData = () => {
  return useContext(GroupDataContext)
}

/* Settlement 頁的 groupAllSettlementData */
/* 5.1.1 檢視所有待結算金額(尚未結清的費用) */
export const GroupAllSettlementDataContext = createContext({
  settlementList: [],
  payerList: [],
  ownerList: [],
  notInvolvedList: []
})

export const useGroupAllSettlementData = () => {
  return useContext(GroupAllSettlementDataContext)
}

/* Settlement 頁的 personalSettlementData */
/* 5.1.2 檢視個人待結算金額(尚未結清的費用) */
export const PersonalSettlementDataContext = createContext({
  settlement: [],
  notInvolvedList: []
})

export const usePersonalSettlementData = () => {
  return useContext(PersonalSettlementDataContext)
}
