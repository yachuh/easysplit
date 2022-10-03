import React, { useEffect, useState } from 'react'
import { useUserData } from '../../context/context'
import { BorderColorOutlined, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import UploadAvatarModal from './UploadAvatarModal'

export default function ProfileUser () {
  const { userData } = useUserData()
  const { name, imageUrl } = userData

  // modal settings
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <div className="flex justify-center items-center gap-5 mb-8 mt-14 md:justify-start">
            <img className="rounded-full border card-shadow" src={imageUrl} alt="userImg" />
            <div
                className="flex flex-col gap-3 items-center">
                <p className="font-bold">{name}</p>
                <div onClick={handleOpen} className="flex items-center justify-center text-gray-400 text-xs gap-2 cursor-pointer">
                    <BorderColorOutlined sx={{ fontSize: 14 }} />編輯大頭貼
                    {/* UploadAvatarModal START */}
                    <Modal open={open} onClose={handleClose} className="modalCard-bg">
                        <div onClick={(e) => e.stopPropagation()} className="modalCard">
                            <div onClick={handleClose} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                            <UploadAvatarModal open={open} onClose={handleClose} />
                        </div>
                    </Modal>
                    {/* UploadAvatarModal END */}
                </div>
            </div>
        </div>
  )
}
