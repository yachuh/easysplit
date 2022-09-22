import CancelIcon from '@mui/icons-material/Cancel'

export default function GroupMemberItem ({ memberId, memberName, userId, imageUrl }) {
  return (
        <li className="member-item">
        <div className="member-item-user">
          <img className="member-item-icon" src={imageUrl} alt={memberName} />
          <div className="member-item-info">
            <p className="mb-1 md:mb-0">{memberName}</p>
            <p>jay123@gmail.com</p>
          </div>
        </div>
          <div className="member-item-sm-icon">
            <CancelIcon />
          </div>
        </li>
  )
}
