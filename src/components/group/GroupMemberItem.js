import CancelIcon from '@mui/icons-material/Cancel'

export default function GroupMemberItem ({ memberId, memberName, userId, imageUrl, email }) {
  return (
    <li className="member-item">
      <div className="member-item-user">
        <img className="member-item-avatar" src={imageUrl} alt={memberName} />
        <div className="member-item-info">
          <p className="mb-1 md:mb-0">{memberName}</p>
          {email
            ? (
              <span className="text-xs">{email}</span>
              )
            : (
              <span className="text-xs text-gray-500">尚未加入</span>
              )}
        </div>
      </div>
      <CancelIcon className="member-item-icon" />
    </li>
  )
}
