import React, { useState } from 'react'
import { deleteCashApi } from '../../utils/api'
import Modal from '@mui/material/Modal'
import EditPaymentCash from './EditPaymentCash'
import { DeletePayment } from '../ModalFeedback'
import LoadingModal from '../LoadingModal'

export default function CashPaymentList ({ payCash, getPaymentAll }) {
  const [isLoading, setIsLoading] = useState(false)
  const { id, name, phone, method } = payCash
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openDeleteItem, setOpenDeleteItem] = useState(false)
  const handleOpenDeleteItem = () => setOpenDeleteItem(true)
  const handleCloseDeleteItem = () => setOpenDeleteItem(false)

  const deleteCash = async (id) => {
    // console.log(id)
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await deleteCashApi(id)
      if (!isSuccess) {
        alert(message)
        return
      }
      console.log(message)
      getPaymentAll()
      handleCloseDeleteItem()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const delClick = () => {
    deleteCash(id)
  }

  return (
        <>
            {
                isLoading
                  ? <LoadingModal />
                  : <li className="ProfilePayment-item">
                        <div className="ProfilePayment-cashWay">
                            <p>現金面交</p>
                            <ul className="ProfilePayment-edit">
                                <li
                                    id={id}
                                    onClick={handleOpen}>編輯</li>
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
                                <li
                                    id={id}
                                    onClick={handleOpenDeleteItem}>刪除</li>
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
                                <p>聯絡電話</p>
                                <p>{phone}</p>
                            </li>
                            <li className='md:w-2/4'>
                                <p>聯絡訊息</p>
                                <p>{method}</p>
                            </li>
                        </ul>
                    </li>
            }
        </>
  )
}
