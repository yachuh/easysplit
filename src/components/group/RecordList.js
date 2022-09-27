import { useEffect, useState } from 'react'
import { useGroupData } from '../../context/context'
import { getExpenseTypeApi } from '../../utils/api'
import { PaymentRecordItem, SettledRecordItem } from './RecordListItem'
import { Add } from '@mui/icons-material'

export default function PaymentRecordList () {
  const { expenseData, settledData } = useGroupData()
  const [expenseTypeList, setExpenseTypeList] = useState([])

  const getExpenseType = async () => {
    try {
      const { expenseType } = await getExpenseTypeApi()
      setExpenseTypeList(expenseType)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getExpenseType()
  }, [])

  return (
    <div className="settlement-card w-full">
      <div className="flex justify-between mb-3 font-bold text-black">
        <h4>費用</h4>
        <button
          className="hidden md:block btn-primary">
          <Add sx={{ fontSize: 20 }} />
          新增費用
        </button>
      </div>
      <ul className='overflow-scroll-view md:h-[25vh] lg:overflow-y-scroll lg:h-[85%]'>
        {
          // expense record
          expenseData.map((item, i) => {
            return (
              <PaymentRecordItem key={i} {...item} expenseTypeList={expenseTypeList} />
            )
          })
        }
        {
          // settled record
          settledData.map((item, i) => {
            return (
              <SettledRecordItem key={i} {...item} />
            )
          })
        }
      </ul>
    </div>
  )
}
