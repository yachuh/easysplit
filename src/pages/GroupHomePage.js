import { useGroupData } from '../context/context.js'
import PaymentRecordList from '../components/group/PaymentRecordList'
import GroupAllSettlement from '../components/settlement/GroupAllSettlement'

export default function GroupHomePage () {
  const { groupData } = useGroupData()
  console.log(groupData)
  return (
    <div className='flex flex-col gap-10 w-full lg:flex-row lg:gap-[5%]'>
      <PaymentRecordList />
      <GroupAllSettlement />
    </div>
  )
}