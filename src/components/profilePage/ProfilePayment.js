import React from 'react'
import { Add } from '@mui/icons-material'
import CashPaymentModal from './CashPaymentModal'
import BankPaymentModal from './BankPaymentModal'
import LinePaymentModal from './LinePaymentModal'
import ProfilePaymentList from './ProfilePaymentList'

export default function ProfilePayment () {
  return (
    <div className='ProfilePayment-wrap relative'>
      <label
        className='ProfilePayment-btn ProfilePayment-label'
        htmlFor="switch">
        <Add sx={{ fontSize: 20 }} />
        <p>
          創建收款方式
        </p>
      </label>
      <input className='ProfilePayment-input hidden' type="checkbox" id="switch" />
      <ul className='ProfilePayment-menu card-shadow absolute top-[15%] md:top-[11%]'>
        <CashPaymentModal />
        <BankPaymentModal />
        <LinePaymentModal />
      </ul>
      <ProfilePaymentList />
    </div>

  )
}
