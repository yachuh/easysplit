import GroupAllSettlement from '../components/settlement/GroupAllSettlement'
import RecordList from '../components/group/RecordList'

export default function GroupHomePage () {
  return (
    <div className='flex flex-col gap-4 w-full justify-between lg:flex-row lg:gap-[2%] lg:h-[70vh]'>
      <RecordList />
      <GroupAllSettlement />
    </div>
  )
}
