import React, { useState, useCallback } from 'react'
import { AttachMoney, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import { useSettledDetailData, useGroupData } from '../../context/context'
import { deleteSettlemetApi } from '../../utils/api'
import SettledDetailImg from '../../image/SettledDetail.svg'
import coverPhoto from '../../image/coverPhoto.svg'
import { ModalConfirmTheDeletion } from '../../components/ModalFeedback'
import LoadingModal from '../LoadingModal'

export default function SettledDetail ({ onClose, getSettledDetail }) {
  const { getAllSettled, groupData } = useGroupData()
  const { groupId } = groupData
  const [isLoading, setIsLoading] = useState(false)
  const { pickDetailData } = useSettledDetailData()
  const {
    settledId,
    ownerMemberId,
    owenerName,
    ownerImageUrl,
    ownerPaytoPayerAmount,
    payerMemberId,
    payerName,
    payerImageUrl,
    status,
    creatDate,
    paymentMethod,
    memo,
    imageUrl
  } = pickDetailData[0]

  const [openDel, setOpenDel] = useState(false)
  const handleOpenDel = () => setOpenDel(true)
  const handleCloseDel = () => setOpenDel(false)

  const deleteSettlemet = useCallback(async (settledId) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await deleteSettlemetApi(settledId)
      if (!isSuccess) {
        return
      }
      getAllSettled(groupId)
      onClose()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [settledId, groupId])

  const deleteSettlemetClick = () => {
    deleteSettlemet(settledId)
    toast.success('刪除成功!')
  }

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div id={settledId} className='w-full'>
            <div className='flex justify-between items-center mb-4'>
              <img
                src={SettledDetailImg}
                alt='SettledDetail'
              />
              <div className='flex flex-col items-end'>
                <p className='font-bold'>{owenerName}<span className='mx-2 font-normal'>支付</span>{payerName}</p>
                <p className='text-colors-fourth'>NTD
                  <span className='mr-1 text-colors-fourth'>
                    <AttachMoney sx={{ fontSize: 16 }} />
                  </span>
                  <span className='text-black font-bold'>{ownerPaytoPayerAmount}</span>
                </p>
              </div>
            </div>

            <ul className='flex justify-between items-center mb-2'>
              <li>日期</li>
              <li className='font-bold'>{creatDate}</li>
            </ul>
            <ul className='flex justify-between items-center mb-2'>
              <li>收款方式</li>
              <li className='font-bold'>{paymentMethod}</li>
            </ul>
            <p className='font-bold mb-5'>
              {memo}
            </p>

            <p className='mb-2'>圖片</p>
            <img
              className='w-full mb-5'
              src={coverPhoto}
              alt='coverPhoto'
            />

            <div className='w-full flex justify-between gap-4'>
              <button
                onClick={handleOpenDel}
                className="btn-red w-full">
                刪除
              </button>
              <Modal
                open={openDel}
                onClose={handleCloseDel}
                className="modalCard-bg">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="modalCard">
                  <div
                    onClick={handleCloseDel}
                    className="modalCancel">
                    <CloseOutlined sx={{ fontSize: 14 }} />
                  </div>
                  <ModalConfirmTheDeletion
                    open={openDel}
                    onClose={handleCloseDel}
                    deleteSettlemetClick={deleteSettlemetClick}
                  />
                </div>
              </Modal>

              <button
                onClick={onClose}
                className="btn-primary w-full">
                確定
              </button>
            </div>
          </div>
      }
    </>

  )
}
