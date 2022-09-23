import { useEffect, useState } from 'react'
import { useGroupData } from '../context/context'
import GroupMemberList from '../components/group/GroupMemberList'
// import AddNewMemberModal from '../components/group/AddNewMemberModal'
import { ChangeRoleModal, AddNewMemberModal } from '../components/group/GroupMemberModal'
import { Add, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'

export default function GroupMemberPage () {
  const { memberList, getMemberList } = useGroupData()

  const [open, setOpen] = useState(false)
  const [openChangeRole, setOpenChangeRole] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleOpenChangeRole = () => setOpenChangeRole(true)
  const handleClose = () => setOpen(false)
  const handleCloseChangeRole = () => setOpenChangeRole(false)

  useEffect(() => {
    getMemberList()
  }, [open])

  return (
    <div className="member-sm mt-[25px] md:mt-10 md:border md:border-colors-primary md:rounded-[20px]">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium ">成員</h3>
        <div className="flex items-center">
          <button onClick={handleOpenChangeRole} className="text-colors-primary font-bold">
            變更我的角色
          </button>
          <button onClick={handleOpen} className="button-icon-lg w-[144px] ml-6">
            <Add sx={{ fontSize: 20 }} />
            新增成員
          </button>
        </div>
        {/* AddNewMemberModal START */}
        <Modal open={open} onClose={handleClose} className="modalCard-bg">
          <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
            <div onClick={handleClose} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
            <AddNewMemberModal open={open} onClose={handleClose} />
          </div>
        </Modal>
        {/* AddNewMemberModal End */}
        {/* ChangeRoleModal START */}
        <Modal open={openChangeRole} onClose={handleCloseChangeRole} className="modalCard-bg">
          <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
            <div onClick={handleCloseChangeRole} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
            <ChangeRoleModal open={openChangeRole} onClose={handleCloseChangeRole} />
          </div>
        </Modal>
        {/* ChangeRoleModal End */}
      </div>
      <div className="p-4">
        <p className="text-gray-500">共 {memberList.length} 位成員</p>
      </div>
      <GroupMemberList />
    </div>
  )
}
