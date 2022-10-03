import React, { useState, useEffect, useCallback } from 'react'
import { Route, Link, useLocation } from 'react-router-dom'
import { AccountBalanceWallet, CloseOutlined, AttachMoney } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import { settledDetailDataContext } from '../../context/context'
import { getSettledDetailApi, getExpenseApi } from '../../utils/api'
import SettledDetail from '../../components/settlement/SettledDetail'
import LoadingModal from '../LoadingModal'
import AddExpenseModal from './expense/AddExpenseModal'

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
export function ExpenseRecordItem ({ expenseTypeList, expenseId, item, cost, creatDate, memo, expenseType, personalStatus, payerList }) {
  const [isLoading, setIsLoading] = useState(false)
  // const pathname = useLocation().pathname // <Link to={`${pathname}/${expenseId}`}>

  /* ---- Modal 相關 START ---- */
  const [openExpenseModal, setOpenExpenseModal] = useState(false)
  const handleOpenExpenseModal = () => setOpenExpenseModal(true)
  const handleCloseExpenseModal = () => setOpenExpenseModal(false)
  /* ---- Modal 相關 END ---- */

  const [expenseData, setExpenseData] = useState({})

  /* ---- APIs START ---- */
  const getExpense = useCallback(async (expenseId) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, expenseData } = await getExpenseApi(expenseId)
      if (!isSuccess) {
        return
      }
      const expenseDetail = expenseData[0]
      setExpenseData(expenseDetail)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [expenseId])

  /**
   * convert expenseMethod to expenseIcon
   * @param {*} expenseType
   * @returns the expmense imageUrl of corresponding expense method
   */
  const toExpenseTypeIcon = (expenseType) => {
    const filterExpenseTypeList = expenseTypeList.filter(type => {
      if (type.id === expenseType) {
        return type.imageUrl
      }
    })
    return (filterExpenseTypeList[0]?.imageUrl)
  }

  useEffect(() => {
    if (expenseId) {
      getExpense(expenseId)
    }
  }, [])

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div
            id={expenseId}
            onClick={handleOpenExpenseModal}
            className="w-full flex flex-col justify-between cursor-pointer gap-2 md:flex-row md:justify-start md:items-center mb-3">
            <div className='flex items-center gap-2 font-bold md:flex-col'>
              <p className='text-gray-500 md:text-black'>{toMonth(creatDate)}</p>
              <p className='text-gray-500 md:text-black md:text-2xl'>{toDay(creatDate)}</p>
            </div>
            <div className='w-full flex items-center gap-4'>
              <img className='w-10 h-10 md:w-16 md:h-16' src={toExpenseTypeIcon(expenseType)} alt={expenseType} />
              <div className='w-full flex flex-col-reverse md:flex-row md:justify-between'>
                <div className='w-full flex flex-col gap-1 md:gap-2'>
                  <p className='font-bold text-black'>{item}</p>
                  <p className='flex'>
                    {payerList[0]?.payerName}
                    <span className='font-normal mx-2'>付了</span>
                    <span className='ml-2'><span className='ml-3 mr-2'>
                      <AttachMoney sx={{ fontSize: 16 }} />
                    </span> {cost.toFixed(2)}</span>
                  </p>
                </div>
                <div className='w-full md:w-[40%] flex gap-3 md:flex-col'>
                  <p className='font-bold md:text-right'>{personalStatus[0]?.statusCh}</p>
                  <p className={`flex justify-end font-bold md:text-right ${personalStatus[0]?.balance > 0 ? 'text-colors-fourth' : 'text-red-700'}`}>{personalStatus[0]?.statusEn === 'notInvolved'
                    ? ''
                    : <span className={`ml-3 mr-2 text-colors-fourth ${personalStatus[0]?.balance > 0 ? 'text-colors-fourth' : 'text-red-700'}`}>
                      <AttachMoney sx={{ fontSize: 16 }} />
                    </span>}{personalStatus[0]?.balance === undefined ? null : ((Math.abs(personalStatus[0]?.balance)).toFixed(2))}</p>
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
          <AddExpenseModal open={openExpenseModal} onClose={handleCloseExpenseModal} getExpense={getExpense} expenseId={expenseId} expenseData={expenseData} setExpenseData={setExpenseData} />
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
  const [isLoading, setIsLoading] = useState(false)

  const [settledDetailData, setSettledDetailData] = useState({
    setllementDetail: []
  })
  const { setllementDetail } = settledDetailData

  const [pickDetailData, setPickDetailData] = useState()

  const getSettledDetail = useCallback(async (settledId) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, setllementDetail } = await getSettledDetailApi(settledId)
      if (!isSuccess) {
        return
      }
      setSettledDetailData(settledDetailData => ({
        ...settledDetailData,
        setllementDetail
      }))
      setIsLoading(false)
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
    <>
      {
        isLoading
          ? <LoadingModal />
          : <settledDetailDataContext.Provider value={{ pickDetailData, setPickDetailData }}>
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
                  <span className='ml-2 text-colors-third'>$ {ownerPaytoPayerAmount.toFixed(2)}</span>
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
      }
    </>

  )
}
