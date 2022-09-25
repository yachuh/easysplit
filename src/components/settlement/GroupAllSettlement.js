import React, { useEffect, useState } from 'react'
import { GroupAllSettlementDataContext, PersonalSettlementDataContext, useGroupData, settlementClickDataContext } from '../../context/context'
import { getGroupAllSettlementApi, getPersonalSettlementApi } from '../../utils/api'
import GroupAllSettlementList from './GroupAllSettlementList'

export default function GroupAllSettlement () {
  const { groupData } = useGroupData()
  const { groupId } = groupData

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

  const [settlementClickData, setSettlementClickData] = useState(
    {
      ownerMemberId: null,
      owenerName: '',
      ownerImageUrl: '',
      ownAmountresult: null,
      payerMemberId: null,
      payerName: '',
      payerImageUrl: '',
      status: ''
    }
  )

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
    if (groupId) {
      getGroupAllSettlement(groupId)
    }
  }, [groupId])

  // if (groupAllSettlementData.payerList === undefined) return null

  return (
    { groupAllSettlementData } &&
    <GroupAllSettlementDataContext.Provider
      value={{ groupAllSettlementData, setGroupAllSettlementData }}>
      <PersonalSettlementDataContext.Provider
        value={{ personalSettlementData, setPersonalSettlementData }}>
        <settlementClickDataContext.Provider
          value={{ settlementClickData, setSettlementClickData }}>
          <GroupAllSettlementList
            getPersonalSettlement={getPersonalSettlement}
            getGroupAllSettlement={getGroupAllSettlement}
          />
        </settlementClickDataContext.Provider>
      </PersonalSettlementDataContext.Provider>
    </GroupAllSettlementDataContext.Provider>
  )
}
