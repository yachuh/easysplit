import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import EditPaymentBank from './EditPaymentBank'

export default function BankPaymentList () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <li className="ProfilePayment-item">
            <div className="ProfilePayment-bankWay">
                <p>銀行轉帳（台灣）</p>
                <ul className="ProfilePayment-edit">
                    <li onClick={handleOpen}>編輯</li>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        className='modalCard-bg'
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='modalCard-pay'>

                            <EditPaymentBank
                                open={open}
                                onClose={handleClose} />

                        </div>
                    </Modal>

                    <li>刪除</li>
                </ul>
            </div>
            <ul className="ProfilePayment-information">
                <li className='md:w-1/4'>
                    <p>姓名</p>
                    <p>陳珍妮</p>
                </li>
                <li className='md:w-1/4'>
                    <p>銀行代碼</p>
                    <p>006</p>
                </li>
                <li className='md:w-1/4'>
                    <p>銀行名稱</p>
                    <p>合作金庫</p>
                </li>
                <li className='md:w-1/4'>
                    <p>銀行帳號</p>
                    <p>00088-8666-333</p>
                </li>
            </ul>
        </li>
  )
}
