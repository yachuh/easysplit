import GroupMemberItem from './GroupMemberItem'
import { useGroupData } from '../../context/context'

export default function GroupMemberList () {
  const { memberList } = useGroupData()

  return (
    <div>
        <div className="p-4">
            <p className="text- text-gray-500">共 {memberList.length} 位成員</p>
        </div>

        <ul className="flex flex-col gap-[23px] p-4">
            {
                memberList.map((member, i) => {
                  return (
                        <GroupMemberItem key={i} {...member} />
                  )
                })
            }
        </ul>
    </div>
  )
}
