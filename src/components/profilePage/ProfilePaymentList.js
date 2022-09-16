import { usePayData } from '../../context/context'
import CashPaymentList from './CashPaymentList'
import BankPaymentList from './BankPaymentList'
import LinePaymentList from './LinePaymentList'
import {
  KeyboardArrowDown
} from '@mui/icons-material'

export default function ProfilePaymentList () {
  const { payData } = usePayData()
  console.log(payData)

  return (
    <div className='flex flex-col items-center gap-5'>
      <ul className="ProfilePayment-view">
        <CashPaymentList />
        <BankPaymentList />
        <BankPaymentList />
        <LinePaymentList />
      </ul>
      {/* <div className='md:hidden'>
                <KeyboardArrowDown />
            </div> */}
    </div>
  )
}
