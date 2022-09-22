import React, { useState } from 'react'
import { deleteBankApi } from '../../utils/api'
import Modal from '@mui/material/Modal'
import EditPaymentBank from './EditPaymentBank'
import { DeletePayment } from '../ModalFeedback'

export default function BankPaymentList ({ payBank, getPaymentAll }) {
  const { id, bankName, bankAccountName, bankCode, bankAccount } = payBank

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openDeleteItem, setOpenDeleteItem] = useState(false)
  const handleOpenDeleteItem = () => setOpenDeleteItem(true)
  const handleCloseDeleteItem = () => setOpenDeleteItem(false)

  const deleteBank = async (id) => {
    console.log(id)
    try {
      const { status: isSuccess, message } = await deleteBankApi(id)
      if (!isSuccess) {
        console.log(message)
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
    deleteBank(id)
  }

  return (
        <li className="ProfilePayment-item">
            <div className="ProfilePayment-bankWay">
                <p>銀行轉帳（台灣）</p>
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

                            <EditPaymentBank
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
                    <p>{bankAccountName}</p>
                </li>
                <li className='md:w-1/4'>
                    <p>銀行代碼</p>
                    <p>{bankCode}</p>
                </li>
                <li className='md:w-1/4'>
                    <p>銀行名稱</p>
                    <p>{bankName}</p>
                </li>
                <li className='md:w-1/4'>
                    <p>銀行帳號</p>
                    <p>{bankAccount}</p>
                </li>
            </ul>
        </li>
  )
}
