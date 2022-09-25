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

/* Settlement 頁的 personalSettlementData */
/* 5.1.3 檢視個人(登入會員本人)待結算金額(尚未結清的費用) */
export const selfSettlementDataContext = createContext({
  userMemberId: null,
  settlement: [],
  notInvolved: []
})

export const useSelfSettlementData = () => {
  return useContext(selfSettlementDataContext)
}

/* 5.1.3 傳遞資料 */
export const settlementClickDataContext = createContext({
  ownerMemberId: null,
  owenerName: '',
  ownerImageUrl: '',
  ownAmountresult: null,
  payerMemberId: null,
  payerName: '',
  payerImageUrl: '',
  status: ''
})

export const useSettlementClickData = () => {
  return useContext(settlementClickDataContext)
}

/* Settlement 頁的 personalSettlementData */
/* 5.4取得單筆結算紀錄明細(已結完) */
export const settledDetailDataContext = createContext({
  settledId: null,
  ownerMemberId: null,
  owenerName: '',
  ownerImageUrl: '',
  ownerPaytoPayerAmount: null,
  payerMemberId: null,
  payerName: '',
  payerImageUrl: '',
  status: '',
  creatDate: '',
  paymentMethod: '',
  memo: '',
  imageUrl: ''
})

export const useSettledDetailData = () => {
  return useContext(settledDetailDataContext)
}
