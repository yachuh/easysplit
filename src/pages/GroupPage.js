import { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { GroupDataContext } from '../context/context'
import { getAGroupApi, getAllMemberApi } from '../utils/api'
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

  // Runs everytime after groupId changes
  useEffect(() => {
    getGroupData()
    getMemberList()
    console.log('groupData', groupData)
    console.log('memberList', memberList)
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

  return (
    <AppLayout>
      <GroupDataContext.Provider value={{ groupData, setGroupData, memberList, setMemberList, getGroupData }}>
        <GroupHeader />
        <Outlet />
      </GroupDataContext.Provider>
    </AppLayout>
  )
}
