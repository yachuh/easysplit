import { Link } from 'react-router-dom'
// import GroupCoverPhoto from '../image/Group_cover-photo.svg'

export default function SideNavGroupItem ({ groupId, groupName, imageUrl }) {
  return (
    <li id={groupId} className="ProfileSideGroup">
      <img className="w-8 h-8 rounded-lg btn-shadow" src={imageUrl} alt="GroupCoverPhoto"/>
        <Link to={`/group/${groupId}`}>{groupName}</Link>
    </li>
  )
}
