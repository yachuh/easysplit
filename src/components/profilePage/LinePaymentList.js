import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import EditPaymentLinePay from './EditPaymentLinePay'

export default function LinePaymentList () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <li className="ProfilePayment-item">
            <div className="ProfilePayment-linepayWay">
                <p>LINE PAY</p>
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

                            <EditPaymentLinePay
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
                    <p>LINE ID</p>
                    <p>qwqwkkk</p>
                </li>
                <li className='md:w-1/4'>
                    <p>聯絡電話</p>
                    <p>0900999888</p>
                </li>
                <li className='md:w-1/4'>
                    <p>收款二維碼 (選填)</p>
                    <img
                        src=""
                        alt=""
                    />
                </li>
            </ul>
        </li>
  )
}
