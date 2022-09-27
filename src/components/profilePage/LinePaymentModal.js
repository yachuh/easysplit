import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import AddPaymentLinePay from './AddPaymentLinePay'
import linePayIcon from '../../image/linePay-sm.svg'

export default function LinePaymentModal ({ getPaymentAll }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <>
            <li
                className='ProfilePayment-way hover:bg-line-pay hover:text-white'
                onClick={handleOpen}>
                <img
                    className='w-6'
                    src={linePayIcon}
                    alt='linePayIcon'
                />
                <p>
                    LINE PAY
                </p>
            </li>
            <Modal
                open={open}
                onClose={handleClose}
                className='modalCard-bg'>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='modalCard-pay'>
                    <AddPaymentLinePay
                        getPaymentAll={getPaymentAll}
                        open={open}
                        onClose={handleClose} />
                </div>
            </Modal>
        </>
  )
}
