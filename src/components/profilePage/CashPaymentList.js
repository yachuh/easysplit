import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import EditPaymentCash from './EditPaymentCash'

export default function CashPaymentList () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <li className="ProfilePayment-item">
            <div className="ProfilePayment-cashWay">
                <p>現金面交</p>
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

                            <EditPaymentCash
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
                    <p>聯絡電話</p>
                    <p>0900999888</p>
                </li>
                <li className='md:w-2/4'>
                    <p>聯絡訊息</p>
                    <p>高雄-好市多(中華店)門口，是個正妹 ! XD</p>
                </li>
            </ul>
        </li>
  )
}
