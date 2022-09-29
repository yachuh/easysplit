import React, { useState, useEffect, useCallback } from 'react'
import { Route, Link, useLocation } from 'react-router-dom'
import { AccountBalanceWallet, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import { settledDetailDataContext } from '../../context/context'
import { getSettledDetailApi, getExpenseApi } from '../../utils/api'
import SettledDetail from '../../components/settlement/SettledDetail'
import LoadingModal from '../LoadingModal'
import SingleExpensePage from '../../pages/SingleExpensePage'

// turn ISOS time into month and day e.g. Sep 23
const toMonthAndDay = (time) => {
  return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
const toMonth = (time) => {
  return new Date(time).toLocaleDateString('en-US', { month: 'short' })
}
const toDay = (time) => {
  return new Date(time).toLocaleDateString('en-US', { day: 'numeric' })
}

/**
 * ==== expense record ====
 */
export function ExpenseRecordItem ({ expenseTypeList, expenseId, item, cost, creatDate, memo, expenseType, personalStatus }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = useLocation().pathname // <Link to={`${pathname}/${expenseId}`}>

  /* ---- Modal 相關 START ---- */
  const [openExpenseModal, setOpenExpenseModal] = useState(false)
  const handleOpenExpenseModal = () => setOpenExpenseModal(true)
  const handleCloseExpenseModal = () => setOpenExpenseModal(false)
  /* ---- Modal 相關 END ---- */

  const [expenseData, setExpenseData] = useState()

  // useEffect(() => {
  //   if (expenseId) {
  //     getExpense()
  //   }
  // }, [expenseId])

  /* ---- APIs START ---- */
  const getExpense = async (expenseId) => {
    try {
      const { status: isSuccess, message, expenseData } = await getExpenseApi(expenseId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log('expenseData:::', expenseData)
      setExpenseData(expenseData)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * convert expenseMethod to expenseIcon
   * @param {*} expenseType
   * @returns the expmense imageUrl of corresponding expense method
   */
  const toExpenseTypeIcon = (expenseType) => {
    const filterExpenseTypeList = expenseTypeList.filter(type => {
      const { expenseMethod, imageUrl } = type
      if (expenseMethod === expenseType) {
        return imageUrl
      }
    })
    // console.log(filterExpenseTypeList[0]?.imageUrl)
    return (filterExpenseTypeList[0]?.imageUrl)
  }

  const onClickExpenseItem = async () => {
    handleOpenExpenseModal()
  }

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div
            onClick={() => { onClickExpenseItem(expenseId) }}
            className="w-full flex flex-col justify-between cursor-pointer gap-2 md:flex-row md:justify-start md:items-center mb-3">
            <div className='flex items-center gap-2 font-bold md:flex-col'>
              <p className=' text-gray-500 md:text-black'>{toMonth(creatDate)}</p>
              <p className='md:text-2xl'>{toDay(creatDate)}</p>
            </div>
            <div className='w-full flex items-center gap-4'>
              <img className='w-16 h-16' src={toExpenseTypeIcon(expenseType)} alt={expenseType} />

              <div className='w-full flex flex-col-reverse md:flex-row md:justify-between'>
                <div className='w-full flex flex-col gap-1 md:gap-2'>
                  <p className='font-bold text-black'>{item}</p>
                  <p>
                    XXX
                    <span className='font-normal mx-2'>付了</span>
                    <span className='ml-2 text-emerald-500'>$ {cost}</span>
                  </p>
                </div>
                <div className='w-1/4 flex gap-3 md:flex-col'>
                  <p className='font-bold md:text-right'>{personalStatus[0]?.statusCh}</p>
                  <p className='md:text-right'>$ {personalStatus[0]?.balance}</p>
                </div>
              </div>

            </div>

          </div>
      }
      {/* ---- ExpenseModal START ---- */}
      <Modal
        open={openExpenseModal}
        onclose={handleCloseExpenseModal}
        onClick={handleCloseExpenseModal}
        className="modalCard-bg"
      >
        <div onClick={(e) => e.stopPropagation()} className="expenseModal">
          <SingleExpensePage open={openExpenseModal} onClose={handleCloseExpenseModal} />
        </div>
      </Modal>
      {/* ---- ExpenseModal END ---- */}
    </>
  )
}

/**
 * ==== settle record ====
 */
export function SettledRecordItem ({ settledId, ownerName, payerName, ownerPaytoPayerAmount, creatDate }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [settledDetailData, setSettledDetailData] = useState({
    setllementDetail: []
  })
  const { setllementDetail } = settledDetailData

  const [pickDetailData, setPickDetailData] = useState()

  const getSettledDetail = useCallback(async (settledId) => {
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
  }, [settledId])

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
        className="flex flex-col justify-center cursor-pointer gap-2 md:flex-row md:justify-start md:items-center mb-3">
        <div className='flex items-center gap-2 font-bold md:flex-col'>
          <p className=' text-gray-500 md:text-black'>{toMonth(creatDate)}</p>
          <p className='md:text-2xl'>{toDay(creatDate)}</p>
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
      <Modal open={open} onClose={handleClose} className="modalCard-bg">
        <div onClick={(e) => e.stopPropagation()} className="modalCard">
          <div onClick={handleClose} className="modalCancel">
            <CloseOutlined sx={{ fontSize: 14 }} />
          </div>
          <SettledDetail open={open} onClose={handleClose} getSettledDetail={getSettledDetail} />
        </div>
      </Modal>
    </settledDetailDataContext.Provider>
  )
}
