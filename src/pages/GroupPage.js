import { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { GroupDataContext } from '../context/context'
import { getAGroupApi, getAllMemberApi, getAllExpenseApi, getAllSettledApi } from '../utils/api'
import AppLayout from './AppLayout'
import GroupHeader from '../components/group/GroupHeader'

export default function GroupPage () {
  const { groupId } = useParams()
  const [groupData, setGroupData] = useState({
    groupId: '',
    groupName: '',
    imageUrl: ''
  })
  const [memberList, setMemberList] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [settledData, setSettledData] = useState([])

  // Runs everytime after groupId changes
  useEffect(() => {
    async function fetchData () {
      await getGroupData()
      await getMemberList()
      await getAllExpense()
      await getAllSettled()
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
  }, [groupId])

  const getMemberList = async () => {
    try {
      const { status: isSuccess, message, memberData } = await getAllMemberApi(groupId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setMemberList(memberData)
    } catch (error) {
      console.log(error)
    }
  }

  const getGroupData = async () => {
    try {
      const { status: isSuccess, message, groupDetail } = await getAGroupApi(groupId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setGroupData(groupData => ({
        ...groupData,
        groupId: groupDetail[0].groupId,
        groupName: groupDetail[0].groupName,
        imageUrl: groupDetail[0].imageUrl
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const getAllExpense = async () => {
    try {
      const { status: isSuccess, message, expenseData } = await getAllExpenseApi(groupId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setExpenseData(expenseData)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllSettled = async () => {
    try {
      const { status: isSuccess, message, settledArrayList: settledData } = await getAllSettledApi(groupId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setSettledData(settledData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppLayout>
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
          getGroupData,
          getMemberList,
          getAllExpense,
          getAllSettled
        }}>
        <GroupHeader />
        <Outlet />
      </GroupDataContext.Provider>
    </AppLayout>
  )
}
