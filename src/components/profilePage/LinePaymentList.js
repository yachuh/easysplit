import React, { useState } from 'react'
import { CloseOutlined } from '@mui/icons-material'
import { deleteLineApi } from '../../utils/api'
import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import EditPaymentLinePay from './EditPaymentLinePay'
import { DeletePayment } from '../ModalFeedback'
import LoadingModal from '../LoadingModal'
import hexschool from '../../image/hexschool.jpg'

export default function LinePaymentList ({ payLine, getPaymentAll }) {
  const [isLoading, setIsLoading] = useState(false)
  const { id, name, phone, lineId, qrCodeUrl } = payLine

  const [openQRCode, setOpenQRCode] = useState(false)
  const handleOpenQRCode = () => setOpenQRCode(true)
  const handleCloseQRCode = () => setOpenQRCode(false)

  const [openDeleteItem, setOpenDeleteItem] = useState(false)
  const handleOpenDeleteItem = () => setOpenDeleteItem(true)
  const handleCloseDeleteItem = () => setOpenDeleteItem(false)

  const deleteLine = async (id) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await deleteLineApi(id)
      if (!isSuccess) {
        return
      }
      getPaymentAll()
      handleCloseDeleteItem()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const delClick = () => {
    deleteLine(id)
    toast.success('成功刪除 LinePay 收款資料!')
  }

  return (
        <>
            {
                isLoading
                  ? <LoadingModal />
                  : <li className="ProfilePayment-item">
                        <div className="ProfilePayment-linepayWay">
                            <p>LINE PAY</p>
                            <ul className="ProfilePayment-edit">
                                {/* <li
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
                                </Modal> */}

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
                                    className='w-10 h-10 cursor-pointer'
                                    src={hexschool}
                                    alt="qrCode"
                                    onClick={handleOpenQRCode}
                                />
                                <Modal
                                    open={openQRCode}
                                    onClose={handleCloseQRCode}
                                    className="modalCard-bg">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="modalCard">
                                        <div
                                            onClick={handleCloseQRCode}
                                            className="modalCancel">
                                            <CloseOutlined sx={{ fontSize: 14 }} />
                                        </div>
                                        <img
                                            className='w-1/2'
                                            src={hexschool}
                                            alt="qrCode"
                                        />
                                    </div>
                                </Modal>
                            </li>
                        </ul>
                    </li>
            }
        </>
  )
}
