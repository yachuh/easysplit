import React, { useEffect, useState } from 'react'
import { GroupAllSettlementDataContext, PersonalSettlementDataContext, useGroupData } from '../../context/context'
import { getGroupAllSettlementApi, getPersonalSettlementApi } from '../../utils/api'
import GroupAllSettlementList from './GroupAllSettlementList'

export default function GroupAllSettlement () {
  const { groupData } = useGroupData()
  const { groupId, groupName, imageUrl } = groupData
  // console.log(groupData)
  // console.log(groupId)

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

  const getGroupAllSettlement = async (groupId) => {
    try {
      const { status: isSuccess, message, settlementList, payerList, ownerList, notInvolvedList } = await getGroupAllSettlementApi(groupId)
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

  // console.log(groupAllSettlementData)

  const getPersonalSettlement = async (id) => {
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

  useEffect(() => {
    getGroupAllSettlement(groupId)
    console.log('groupID :>> ', groupId)
  }, [groupId])

  if (groupAllSettlementData.payerList === undefined) return null

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
