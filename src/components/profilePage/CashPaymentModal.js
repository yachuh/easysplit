import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import { LocalAtm } from '@mui/icons-material'
import AddPaymentCash from './AddPaymentCash'

export default function CashPaymentModal ({ getPaymentAll }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <>
            <li
                className='ProfilePayment-way hover:bg-colors-fifth'
                onClick={handleOpen}>
                <LocalAtm sx={{ fontSize: 24 }} />
                <p>
                    現金面交
                </p>
            </li>
            <Modal
                open={open}
                onClose={handleClose}
                className='modalCard-bg'
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='modalCard-pay'>

                    <AddPaymentCash
                        getPaymentAll={getPaymentAll}
                        open={open}
                        onClose={handleClose} />

                </div>
            </Modal>
        </>

  )
}
