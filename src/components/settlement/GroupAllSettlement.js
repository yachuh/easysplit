import React, { useEffect, useState } from 'react'
import { GroupAllSettlementDataContext, PersonalSettlementDataContext } from '../../context/context'
import { getGroupAllSettlementApi, getPersonalSettlementApi } from '../../utils/api'
import GroupAllSettlementList from './GroupAllSettlementList'

export default function GroupAllSettlement () {
  const [groupAllSettlementData, setGroupAllSettlementData] = useState({
    settlementList: [],
    payerList: [],
    ownerList: [],
    notInvolvedList: []
  })

  const [personalSettlementData, setPersonalSettlementData] = useState({
    settlement: [],
    notInvolvedList: []
  })

  const getGroupAllSettlement = async () => {
    try {
      const { status: isSuccess, message, settlementList, payerList, ownerList, notInvolvedList } = await getGroupAllSettlementApi()
      if (!isSuccess) {
        console.log(message)
        return
      }
      setGroupAllSettlementData(groupAllSettlementData => ({
        ...groupAllSettlementData,
        settlementList,
        payerList,
        ownerList,
        notInvolvedList
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const getPersonalSettlement = async (id) => {
    console.log(id)
    try {
      const { status: isSuccess, message, settlement, notInvolvedList } = await getPersonalSettlementApi(id)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setPersonalSettlementData(personalSettlementData => ({
        ...personalSettlementData,
        settlement,
        notInvolvedList
      }))
    } catch (error) {
      console.log(error)
    }
  }
  console.log(personalSettlementData)

  useEffect(() => {
    getGroupAllSettlement()
    getPersonalSettlement()
  }, [])

  return (
    <GroupAllSettlementDataContext.Provider
      value={{ groupAllSettlementData, setGroupAllSettlementData }}>
      <PersonalSettlementDataContext.Provider
        value={{ personalSettlementData, setPersonalSettlementData }}>
        <GroupAllSettlementList getPersonalSettlement={getPersonalSettlement} />
      </PersonalSettlementDataContext.Provider>
    </GroupAllSettlementDataContext.Provider>
  )
}
