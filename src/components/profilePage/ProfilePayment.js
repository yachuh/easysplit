import React, { useEffect, useState } from 'react'
import { getPaymentAllApi } from '../../utils/api'
import { PayDataContext } from '../../context/context'
import { Add } from '@mui/icons-material'
import CashPaymentModal from './CashPaymentModal'
import BankPaymentModal from './BankPaymentModal'
import LinePaymentModal from './LinePaymentModal'
import ProfilePaymentList from './ProfilePaymentList'

export default function ProfilePayment () {
  const [payData, setPayData] = useState({
    bank: [],
    cash: [],
    line: []
  })

  const getPaymentAll = async () => {
    try {
      const { status: isSuccess, message, bank, cash, line } = await getPaymentAllApi()
      if (!isSuccess) {
        console.log(message)
        return
      }
      setPayData(payData => ({
        ...payData,
        bank,
        cash,
        line
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPaymentAll()
  }, [])

  console.log(payData)
  console.log(payData.bank)

  return (
    <PayDataContext.Provider value={{ payData, setPayData }}>
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
    </PayDataContext.Provider>
  )
}
