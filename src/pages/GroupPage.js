import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { GroupDataContext } from '../context/context'
import { getAGroupApi, getAllMemberApi, getAllExpenseApi, getAllSettledApi, getExpenseTypeApi } from '../utils/api'
import AppLayout from './AppLayout'
import GroupHeader from '../components/group/GroupHeader'
import LoadingModal from '../components/LoadingModal'

export default function GroupPage () {
  const [isLoading, setIsLoading] = useState(false)
  const { groupId } = useParams()

  /* ---- STATE 相關 START ---- */
  const [groupData, setGroupData] = useState({
    groupId: '',
    groupName: '',
    imageUrl: ''
  })
  const [memberList, setMemberList] = useState([])
  const [expenseTypeList, setExpenseTypeList] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [settledData, setSettledData] = useState([])
  /* ---- STATE 相關 END ---- */

  // Runs everytime after groupId changes
  useEffect(() => {
    async function fetchData () {
      await getGroupData()
      await getMemberList()
      await getAllExpense()
      await getAllSettled()
      await getExpenseType()
    }
    fetchData()
    // getGroupData()
    // getMemberList()
    // getAllExpense()
    // getAllSettled()
    console.log('groupData:::', groupData)
    console.log('memberList:::', memberList)
    console.log('expenseData:::', expenseData)
    console.log('settledData:::', settledData)
    console.log('expenseTypeList:::', expenseTypeList)
  }, [groupId])

  /* ---- API START ---- */
  const getMemberList = async () => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, memberData } = await getAllMemberApi(groupId)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      setMemberList(memberData)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getExpenseType = async () => {
    try {
      const { expenseType } = await getExpenseTypeApi()
      setExpenseTypeList(expenseType)
    } catch (error) {
      console.log(error)
    }
  }

  const getGroupData = async () => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, groupDetail } = await getAGroupApi(groupId)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      setGroupData(groupData => ({
        ...groupData,
        groupId: groupDetail[0].groupId,
        groupName: groupDetail[0].groupName,
        imageUrl: groupDetail[0].imageUrl
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllExpense = async () => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, expenseData } = await getAllExpenseApi(groupId)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      setExpenseData(expenseData)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllSettled = async () => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, settledArrayList: settledData } = await getAllSettledApi(groupId)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      setSettledData(settledData)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  /* ---- API END ---- */

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <AppLayout>
            <GroupDataContext.Provider
              value={{
                groupData,
                setGroupData,
                memberList,
                setMemberList,
                expenseData,
                setExpenseData,
                settledData,
                setSettledData,
                expenseTypeList,
                setExpenseTypeList,
                getGroupData,
                getMemberList,
                getAllExpense,
                getAllSettled
              }}>
              <GroupHeader />
              <Outlet />
            </GroupDataContext.Provider>
          </AppLayout>
      }
    </>
  )
}
