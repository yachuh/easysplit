import React, { useState } from 'react'
import { AccountBalanceWallet, CloseOutlined, AttachMoney } from '@mui/icons-material'
import Modal from '@mui/material/Modal'

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

export function SettledRecordItem ({ settleId, owenerName: ownerName, payerName, ownerPaytoPayerAmount: amount }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      {/* date & type */}
      <div onClick={handleOpen} className="flex items-center cursor-pointer gap-2">
        <div className='flex flex-col items-center'>
          <div className='flex items-center gap-2 text-gray-500 md:text-black font-bold'>
            <p>Sep</p>
            <p className='md:text-2xl'>23</p>
          </div>
          <div className="w-5 h-5 rounded p-5 bg-emerald-100 text-emerald-500 flex justify-center items-center">
            <AccountBalanceWallet sx={{ fontSize: 24 }} />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p>你收到
            <span className='ml-3 mr-2 text-colors-fourth'>
              <AttachMoney sx={{ fontSize: 16 }} />
            </span>
            <span className='text-colors-fourth'>
              123456
            </span>
          </p>
          <p>{ownerName} 支付 {payerName} ${amount}</p>
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
          123
          {/* <ModalSettlement
            open={open}
            onClose={handleClose}
            getPersonalSettlement={getPersonalSettlement}
            getGroupAllSettlement={getGroupAllSettlement}
          /> */}
        </div>
      </Modal>
    </>

  )
}
