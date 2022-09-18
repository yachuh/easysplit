import React, { useState } from 'react'
import { deleteLineApi } from '../../utils/api'
import Modal from '@mui/material/Modal'
import EditPaymentLinePay from './EditPaymentLinePay'
import { DeletePayment } from '../ModalFeedback'

export default function LinePaymentList ({ payLine, getPaymentAll }) {
  const { id, name, phone, lineId, qrCode } = payLine

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openDeleteItem, setOpenDeleteItem] = useState(false)
  const handleOpenDeleteItem = () => setOpenDeleteItem(true)
  const handleCloseDeleteItem = () => setOpenDeleteItem(false)

  const deleteLine = async (id) => {
    console.log(id)
    try {
      const { status: isSuccess, message } = await deleteLineApi(id)
      if (!isSuccess) {
        alert(message)
        return
      }
      console.log(message)
      getPaymentAll()
      handleCloseDeleteItem()
    } catch (error) {
      console.log(error)
    }
  }

  const delClick = () => {
    deleteLine(id)
  }

  return (
        <li className="ProfilePayment-item">
            <div className="ProfilePayment-linepayWay">
                <p>LINE PAY</p>
                <ul className="ProfilePayment-edit">
                    <li
                        id={id}
                        onClick={handleOpen}>
                        編輯
                    </li>
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

                    <li
                        id={id}
                        onClick={handleOpenDeleteItem}>
                        刪除
                    </li>
                    <Modal
                        open={openDeleteItem}
                        onClose={handleCloseDeleteItem}
                        onClick={delClick}
                        className='modalCard-bg'
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='modalCard'>

                            <DeletePayment
                                open={openDeleteItem}
                                onClose={handleCloseDeleteItem}
                                onClick={delClick}
                            />
                        </div>
                    </Modal>
                </ul>
            </div>
            <ul className="ProfilePayment-information">
                <li className='md:w-1/4'>
                    <p>姓名</p>
                    <p>{name}</p>
                </li>
                <li className='md:w-1/4'>
                    <p>LINE ID</p>
                    <p>{lineId}</p>
                </li>
                <li className='md:w-1/4'>
                    <p>聯絡電話</p>
                    <p>{phone}</p>
                </li>
                <li className='md:w-1/4'>
                    <p>收款二維碼 (選填)</p>
                    <img
                        className='w-4 h-4'
                        src={qrCode}
                        alt=""
                    />
                </li>
            </ul>
        </li>
  )
}
