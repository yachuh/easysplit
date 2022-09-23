import { useGroupData } from '../../context/context'

export default function PaymentRecordList () {
  const { groupData } = useGroupData()
  console.log(groupData)
  return (
    <div className='settlement-card lg:w-[52%]'>
            <p>{`Group id: ${groupData.groupId}`}</p>
        </div>
  )
}
