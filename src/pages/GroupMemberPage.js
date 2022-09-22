import { useState } from 'react'
import GroupMemberList from '../components/group/GroupMemberList'
import { Add, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import AddNewMemberModal from '../components/group/AddNewMemberModal'

export default function GroupMemberPage () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="member-sm mt-[25px] md:mt-10 md:border md:border-colors-primary md:rounded-[20px]">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium ">成員</h3>
        <button onClick={handleOpen} className="button-icon-lg w-[144px]">
          <Add sx={{ fontSize: 20 }} />
          新增成員
        </button>
        {/* AddNewMemberModal START */}
        <Modal open={open} onClose={handleClose} className="modalCard-bg">
          <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
            <div onClick={handleClose} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
            <AddNewMemberModal open={open} onClose={handleClose} />
          </div>
        </Modal>
        {/* AddNewMemberModal End */}
      </div>
      <GroupMemberList />
    </div>
  )
}
