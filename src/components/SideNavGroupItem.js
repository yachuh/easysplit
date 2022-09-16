import { Link } from 'react-router-dom'
import GroupCoverPhoto from '../image/Group_cover-photo.svg'

export default function SideNavGroupItem ({ groupId, groupName }) {
  return (
    <li className="ProfileSideGroup">
        <img className="w-8" src={GroupCoverPhoto} alt="GroupCoverPhoto"/>
        <Link to={`/group/${groupId}`}>{groupName}</Link>
    </li>
  )
}
