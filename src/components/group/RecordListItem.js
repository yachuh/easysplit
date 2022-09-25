import React, { useState, useEffect } from 'react'
import { AccountBalanceWallet, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import { settledDetailDataContext } from '../../context/context'
import { getSettledDetailApi } from '../../utils/api'
import SettledDetail from '../../components/settlement/SettledDetail'

export function PaymentRecordItem ({ expenseTypeList, expenseId, item, cost, creatDate, memo, expenseType }) {
  const toExpenseTypeIcon = (expenseType) => {
    // get expense type imageUrl
    const filterExpenseTypeList = expenseTypeList.filter(type => {
      const { expenseMethod, imageUrl } = type
      if (expenseMethod === expenseType) {
        return imageUrl
      }
    })
    // console.log(filterExpenseTypeList[0]?.imageUrl)
    return (filterExpenseTypeList[0]?.imageUrl)
  }

  // turn time into date formnat, e.g. Sep 23
  const toDate = (time) => {
    const dateAry = time.split(' ')
    const date = `${dateAry[0]} ${dateAry[1]}`
    return date
  }

  return (
    <div className="flex">
      {/* date & type */}
      <div className="md:flex items-center">
        <p>{toDate(creatDate)}</p>
        <div className="w-[64px] h-[64px] rounded-2xl p-5 bg-emerald-100 text-emerald-500">
          <img src={toExpenseTypeIcon(expenseType)} alt={expenseType} />
        </div>
      </div>
      <div className="flex ml-2">
        <h3>{item}</h3>
        <p>{cost}</p>
      </div>
    </div>
  )
}

export function SettledRecordItem ({ settledId, ownerName, payerName, ownerPaytoPayerAmount }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [settledDetailData, setSettledDetailData] = useState({
    setllementDetail: []
  })
  const { setllementDetail } = settledDetailData

  const [pickDetailData, setPickDetailData] = useState()

  const getSettledDetail = async (settledId) => {
    try {
      const { status: isSuccess, message, setllementDetail } = await getSettledDetailApi(settledId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setSettledDetailData(settledDetailData => ({
        ...settledDetailData,
        setllementDetail
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (settledId) {
      getSettledDetail(settledId)
    }
  }, [settledId])

  const SettledRecordClick = () => {
    const filterDetail = setllementDetail.filter(item => {
      return (settledId === item.settledId)
    })
    setPickDetailData(filterDetail)
    handleOpen()
  }

  return (
    <settledDetailDataContext.Provider value={{ pickDetailData, setPickDetailData }}>
      {/* date & type */}
      <div
        onClick={SettledRecordClick}
        id={settledId}
        className="flex flex-col justify-center cursor-pointer gap-2 md:flex-row md:justify-start md:items-center">
        <div className='flex items-center gap-2 font-bold md:flex-col'>
          <p className=' text-gray-500 md:text-black'>Sep</p>
          <p className='md:text-2xl'>23</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className="w-5 h-5 rounded p-5 bg-emerald-100 text-emerald-500 flex justify-center items-center md:w-16 md:h-16 md:rounded-2xl">
            <AccountBalanceWallet sx={{ fontSize: 24 }} />
          </div>
          <p className='font-bold text-black'>
            {ownerName}
            <span className='font-normal mx-2'>支付</span>
            {payerName}
            <span className='ml-2 text-emerald-500'>$ {ownerPaytoPayerAmount}</span>
          </p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className="modalCard-bg">
        <div
          onClick={(e) => e.stopPropagation()}
          className="modalCard">
          <div
            onClick={handleClose}
            className="modalCancel">
            <CloseOutlined sx={{ fontSize: 14 }} />
          </div>
          <SettledDetail
            open={open}
            onClose={handleClose}
            getSettledDetail={getSettledDetail}
          />
        </div>
      </Modal>
    </settledDetailDataContext.Provider>

  )
}
