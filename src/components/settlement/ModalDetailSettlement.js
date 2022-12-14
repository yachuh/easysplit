import React, { useState, useEffect, useCallback } from 'react'
import { ArrowCircleDown, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import { getPaymentTypeApi, settleUpApi } from '../../utils/api'
import { useSettlementClickData, useGroupData } from '../../context/context'
import { ModalSettlementSuccess } from '../ModalFeedback'
import LoadingModal from '../LoadingModal'

export const ModalDetailSettlement = ({ onClose, getPersonalSettlement, getGroupAllSettlement }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  const { getAllSettled, groupData } = useGroupData()
  const { groupId } = groupData

  const { settlementClickData } = useSettlementClickData()
  const { ownerMemberId, owenerName, ownerImageUrl, ownAmountresult, payerMemberId, payerName, payerImageUrl } = settlementClickData[0]

  const [paymentTypeData, setPaymentTypeData] = useState({
    paymentType: []
  })

  const [paymentTypeValue, setPaymentTypeValue] = useState(null)
  const [textValue, setTextValue] = useState('')

  const [openSuccess, setOpenSuccess] = useState(false)

  const handleOpenSuccess = () => setOpenSuccess(true)
  const handleCloseSuccess = () => setOpenSuccess(false)

  const getPaymentType = useCallback(async () => {
    setIsLoading(true)
    try {
      const { paymentType } = await getPaymentTypeApi()
      setPaymentTypeData(paymentTypeData => ({
        ...paymentTypeData,
        paymentType
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const [settleUpData, setSettleUpData] = useState({
    GroupId: groupId,
    OwnerMemberId: ownerMemberId,
    PayerMemberId: payerMemberId,
    OwnerPaytoPayerAmount: ownAmountresult,
    PaymentMethod: paymentTypeValue,
    Memo: textValue,
    FileName: '',
    CreatDate: startDate
  })

  const paymentTypeChange = (e) => {
    setPaymentTypeValue(e.target.value)
    setSettleUpData(settleUpData => ({
      ...settleUpData,
      PaymentMethod: e.target.value
    }))
  }

  const textValueChange = (e) => {
    setTextValue(e.target.value)
    setSettleUpData(settleUpData => ({
      ...settleUpData,
      Memo: textValue
    }))
  }
  const dataChange = (date) => {
    setStartDate(date)
    setSettleUpData(settleUpData => ({
      ...settleUpData,
      CreatDate: date
    }))
  }

  const settleUp = useCallback(async (settleUpData) => {
    setIsLoading(true)
    try {
      const { GroupId, OwnerMemberId, PayerMemberId, OwnerPaytoPayerAmount, PaymentMethod, Memo, FileName, CreatDate } = await settleUpApi(settleUpData)
      // console.log('???????????? :>> ', '????????????')
      getGroupAllSettlement(groupId)
      getPersonalSettlement(settleUpData.OwnerMemberId)
      getAllSettled(groupId)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const clickSettleUp = () => {
    setIsLoading(true)
    settleUp(settleUpData)
    toast.success('????????????!')
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // console.log('groupId:', groupId)
  useEffect(() => {
    getPaymentType()
  }, [])

  const mapPaymentType = paymentTypeData.paymentType.map((paymentType, i) => {
    const { id, paymentMethod } = paymentType
    return <option key={i} value={id}>{paymentMethod}</option>
  })

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div className='w-full'>
            <p className='modalSettlement-title'>??????</p>
            <div className='flex justify-between items-center'>
              <p className='font-bold text-colors-primary'>From</p>
              <div className='flex gap-3 items-center'>
                <img
                  className='settlement-userImg rounded-full'
                  src={ownerImageUrl}
                  alt='userSettlement'
                />
                <p className='font-bold text-black'>{owenerName}</p>
              </div>
            </div>
            <p className='text-gray-400 text-left'>??????</p>
            <div className='flex justify-between items-center mb-2 gap-1'>
              <p className='w-[25%] font-bold text-colors-primary'>NTD $</p>
              <input
                id="account"
                className="inputInfo pl-4 w-[75%]"
                type="text"
                defaultValue={ownAmountresult}
              />
            </div>
            <div className='py-1 text-center text-colors-primary'>
              <ArrowCircleDown sx={{ fontSize: 30 }} />
            </div>
            <div className='flex justify-between items-center'>
              <p className='font-bold text-colors-primary'>To</p>
              <div className='flex gap-3 items-center'>
                <img
                  className='settlement-userImg rounded-full'
                  src={payerImageUrl}
                  alt='userSettlement'
                />
                <p className='font-bold text-black'>{payerName}</p>
              </div>
            </div>
            <p className='text-gray-400 text-left mb-2'>???????????????</p>
            <select onChange={paymentTypeChange} className="inputInfo px-4 text-black mb-3">
              {mapPaymentType}
            </select>
            <hr />

            <DatePicker
              className='inputInfo pl-4 mt-3 mb-3'
              selected={startDate}
              onChange={dataChange}
            />
            <div className='flex gap-3'>
              <div className='w-full'>
                <label
                  className='labelTitle'
                  htmlFor="remark">
                  ??????
                </label>
                <textarea
                  onChange={textValueChange}
                  className="inputInfo pl-2 h-[40px] mb-3"
                  placeholder="???????????????"
                  value={textValue} />
              </div>
              {/* <div className='w-1/2'>
                <label
                  className='labelTitle'
                  htmlFor="qrcode">
                  ????????????
                </label>
                <input
                  id='qrcode'
                  className="inputInfo pl-2 mb-3"
                  type="file"
                  placeholder="??????"
                />
              </div> */}
            </div>

            <div className='w-full flex justify-between gap-4'>
              <button
                onClick={onClose}
                className="btn-outline w-full">
                ??????
              </button>
              <button
                onClick={clickSettleUp}
                className="btn-primary w-full">
                ??????
              </button>
              <Modal
                open={openSuccess}
                onClose={handleCloseSuccess}
                className='modalCard-bg'>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className='modalCard'>
                  <div
                    onClick={handleCloseSuccess}
                    className="modalCancel">
                    <CloseOutlined sx={{ fontSize: 14 }} />
                  </div>
                  <ModalSettlementSuccess
                    open={openSuccess}
                    onClose={handleCloseSuccess} />
                </div>
              </Modal>
            </div>
          </div>
      }
    </>

  )
}
