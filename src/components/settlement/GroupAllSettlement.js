import React, { useEffect, useState, useCallback } from 'react'
import { GroupAllSettlementDataContext, PersonalSettlementDataContext, useGroupData, settlementClickDataContext } from '../../context/context'
import { getGroupAllSettlementApi, getPersonalSettlementApi } from '../../utils/api'
import GroupAllSettlementList from './GroupAllSettlementList'
import LoadingModal from '../LoadingModal'

export default function GroupAllSettlement () {
  const [isLoading, setIsLoading] = useState(false)
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

  const getGroupAllSettlement = useCallback(async (groupId) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, settlementList, payerList, ownerList, notInvolvedList } = await getGroupAllSettlementApi(groupId)
      if (!isSuccess) {
        return
      }
      setGroupAllSettlementData(groupAllSettlementData => ({
        ...groupAllSettlementData,
        settlementList,
        payerList,
        ownerList,
        notInvolvedList
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [groupId])

  const getPersonalSettlement = useCallback(async (id) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, settlement, notInvolvedList } = await getPersonalSettlementApi(id)
      if (!isSuccess) {
        return
      }
      setPersonalSettlementData(personalSettlementData => ({
        ...personalSettlementData,
        settlement,
        notInvolvedList
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

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
            groupAllSettlementData={groupAllSettlementData}
          />
        </settlementClickDataContext.Provider>
      </PersonalSettlementDataContext.Provider>
    </GroupAllSettlementDataContext.Provider>

  )
}
