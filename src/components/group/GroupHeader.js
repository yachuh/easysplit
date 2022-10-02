import { Link } from 'react-router-dom'
import { useGroupData } from '../../context/context'

export default function GroupHeader () {
  const { groupData } = useGroupData()
  const { groupId, groupName, imageUrl } = groupData

  return (
    <div>
      {/* group info */}
      <div className="group-item-lg">
        <img className="group-coverPhoto-md btn-shadow" src={imageUrl} alt={groupName} />
        <h2 className="text-2xl">{groupName}</h2>
      </div>
      {/* group nav list */}
      <ul className="flex w-full justify-between lg:justify-start mb-5">
        <li className="nav-item"><Link to={`/group/${groupId}`}>總覽</Link></li>
        <li className="nav-item"><Link to={`/group/${groupId}/member`}>成員</Link></li>
        <li className="nav-item"><Link to={`/group/${groupId}/setting`}>設定</Link></li>
      </ul>
    </div>
  )
}
