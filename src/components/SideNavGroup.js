import { useState, useEffect } from 'react'
import SideNavGroupItem from './SideNavGroupItem'
import { Add, CloseOutlined } from '@mui/icons-material'
import { getAllGroupApi } from '../utils/api'
import Modal from '@mui/material/Modal'
import AddNewGroupModal from './AddNewGroupModal'

export default function SideNavGroup () {
  const [groupList, setGroupList] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    getAllGroup()
  }, [open])

  const getAllGroup = async () => {
    try {
      const { status: isSuccess, message, group: groupList } = await getAllGroupApi()
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log('groupList', groupList)
      setGroupList(groupList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col mb-10">
      {/* add group */}
      <div className="flex items-center justify-between font-bold mb-12">
        <h4>群組</h4>
        <div onClick={handleOpen} className="flex items-center gap-2 text-colors-primary cursor-pointer">
          <Add sx={{ fontSize: 20 }} />新增群組
          {/* AddNewGroupModal START */}
          <Modal open={open} onClose={handleClose} className="modalCard-bg">
            <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
              <div onClick={handleClose} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
              <AddNewGroupModal open={open} onClose={handleClose} />
            </div>
          </Modal>
          {/* AddNewGroupModal End */}
        </div>
      </div>
      {/* group list */}
      <ul className="flex flex-col gap-5 w-full">
        {
          groupList.map((group, i) => {
            return (
              <SideNavGroupItem key={i} {...group} />
            )
          })
        }
      </ul>
    </div>
  )
}
