export default function GroupMemberListItem ({ memberId, memberName, userId, imageUrl, email, setNewMemberId }) {
  const handleOnClick = (e) => {
    setNewMemberId(e.currentTarget.id)
  }

  return (
        <li id={memberId}
            className="member-item cursor-pointer border-b border-colors-third hover:bg-gray-200"
            onClick={handleOnClick}
        >
          <div className="member-item-user">
            <img className="member-item-avatar" src={imageUrl} alt={memberName} />
            <div className="member-item-info">
                <p className="mb-1 md:mb-0">{memberName}</p>
            </div>
          </div>
        </li>
  )
}
