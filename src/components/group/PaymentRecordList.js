import { useGroupData } from '../../context/context'

export default function PaymentRecordList () {
  const { groupData } = useGroupData()
  console.log(groupData)
  return (
        <div>
            <p>{`Group id: ${groupData.groupId}`}</p>
        </div>
  )
}
