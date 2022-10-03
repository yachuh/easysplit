import { useState } from 'react'
import Modal from '@mui/material/Modal'
import { DeleteMemberModal, EditMemberModal } from './GroupModal'
import { CloseOutlined, Cancel, Edit } from '@mui/icons-material'
import { useUserData } from '../../context/context'

export default function GroupMemberItem ({ memberId, memberName, userId, imageUrl, email }) {
  const { userData, setUserData } = useUserData
  console.log(userData)
  const [open, setOpen] = useState(false)
  const [openEditMember, setOpenEditMember] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenEditMember = () => setOpenEditMember(true)
  const handleCloseEditMember = () => setOpenEditMember(false)

  return (
    <li className="member-item hover:bg-colors-seventh hover:text-white">
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
      <div className="flex items-center gap-4">
        <div onClick={handleOpenEditMember} className="cursor-pointer hover:scale-110">
          <Edit className="member-item-icon" />
        </div>
        {/* EditMemberModal START */}
        <Modal open={openEditMember} onClose={handleCloseEditMember} className="modalCard-bg">
          <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
            <div onClick={handleCloseEditMember} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
            <EditMemberModal open={openEditMember} onClose={handleCloseEditMember} memberId={memberId} memberName={memberName} />
          </div>
        </Modal>
        {/* EditMemberModal End */}
        <div onClick={handleOpen} className="cursor-pointer hover:scale-110">
          <Cancel className="member-item-icon" />
        </div>
        {/* DeleteMemberModal START */}
        <Modal open={open} onClose={handleClose} className="modalCard-bg">
          <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
            <div onClick={handleClose} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
            <DeleteMemberModal open={open} onClose={handleClose} memberId={memberId} memberName={memberName} />
          </div>
        </Modal>
        {/* DeleteMemberModal End */}
      </div>
    </li>
  )
}
