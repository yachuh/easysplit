import { usePayData } from '../../context/context'
import CashPaymentList from './CashPaymentList'
import BankPaymentList from './BankPaymentList'
import LinePaymentList from './LinePaymentList'
import {
  KeyboardArrowDown
} from '@mui/icons-material'

export default function ProfilePaymentList ({ getPaymentAll }) {
  const { payData } = usePayData()
  const { bank, cash, line } = payData

  console.log(payData)
  console.log(bank, cash, line)

  const mapBankPaymentList = bank.map((payBank, i) => {
    return (
      <BankPaymentList
        key={i}
        payBank={payBank}
        getPaymentAll={getPaymentAll}
      />
    )
  })

  const mapCashPaymentList = cash.map((payCash, i) => {
    return (
      <CashPaymentList
        key={i}
        payCash={payCash}
        getPaymentAll={getPaymentAll}
      />
    )
  })

  const mapLinePaymentList = line.map((payLine, i) => {
    return (
      <LinePaymentList
        key={i}
        payLine={payLine}
        getPaymentAll={getPaymentAll}
      />
    )
  })

  return (
    <div className='flex flex-col items-center gap-5'>
      <ul className="ProfilePayment-view">
        {mapCashPaymentList}
        {mapBankPaymentList}
        {mapLinePaymentList}
      </ul>
      {/* <div className='md:hidden'>
                <KeyboardArrowDown />
            </div> */}
    </div>
  )
}
