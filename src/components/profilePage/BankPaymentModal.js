import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import { CreditCard } from '@mui/icons-material'
import AddPaymentBank from './AddPaymentBank'

export default function BankPaymentModal () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <>
            <li
                className='ProfilePayment-way hover:bg-colors-primary hover:text-white'
                onClick={handleOpen}>
                <CreditCard sx={{ fontSize: 24 }} />
                <p>
                    銀行轉帳（台灣）
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

                    <AddPaymentBank
                        open={open}
                        onClose={handleClose} />

                </div>
            </Modal>
        </>

  )
}
