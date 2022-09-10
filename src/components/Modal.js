import React, { useState } from 'react'
import { ModalResetPwd } from '../components/ModalFeedback'
import Modal from '@mui/material/Modal'
// import ReactDom from 'react-dom'
import {
  CloseOutlined
} from '@mui/icons-material'

export default function ModalResetPassword () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className='modalCard-bg'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='modalCard'>
        <div
          onClick={handleClose}
          className="modalCancel">
          <CloseOutlined sx={{ fontSize: 14 }} />
        </div>
        <ModalResetPwd
          open={open}
          onClose={handleClose} />
      </div>
    </Modal>

  )
}

// export default function Modal({ open, children, onClose }) {
//   if (!open) return null

//   return (
//     <div
//         onClick={onClose}
//         className='modalCard-bg'>
//         <div
//             onClick={(e) => e.stopPropagation()}
//             className='modalCard'>
//             <div
//                 onClick={onClose}
//                 className="modalCancel">
//                 <CloseOutlined sx={{ fontSize: 14 }} />
//             </div>
//             {children}
//         </div>
//     </div>
//   )
// }
