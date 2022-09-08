import React from 'react'
import ReactDom from 'react-dom'
import {
  CloseOutlined
} from '@mui/icons-material'

export default function Modal ({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
        <div className='modalCard-bg'>
            <div className='modalCard w-[30%] card-shadow relative'>
                <div
                    onClick={onClose}
                    className="absolute top-[18px] right-[18px] text-gray-500 cursor-pointer">
                    <CloseOutlined sx={{ fontSize: 14 }} />
                </div>
                {children}
            </div>
        </div>,
        document.getElementById('modal')
  )
}
