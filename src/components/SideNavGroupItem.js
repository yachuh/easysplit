import { Link } from 'react-router-dom'
// import GroupCoverPhoto from '../image/Group_cover-photo.svg'

export default function SideNavGroupItem ({ groupId, groupName, imageUrl }) {
  return (
    <li className="ProfileSideGroup">
      <img className="w-8" src={imageUrl} alt="GroupCoverPhoto"/>
        <Link to={`/group/${groupId}`}>{groupName}</Link>
    </li>
  )
}
