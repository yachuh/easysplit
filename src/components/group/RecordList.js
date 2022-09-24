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
    <div className="settlement-card lg:w-[52%] h-[578px]">
      <div className="flex justify-between mb-9 font-bold text-black">
        <h3 className="text-2xl font-medium">費用</h3>
        <button
          className="hidden lg:block btn-primary">
          <Add sx={{ fontSize: 20 }} />
          新增費用
        </button>
      </div>
      <ul className="flex flex-col gap-[23px] p-4 h-[280px] overflow-scroll md:h-[240px] md:overflow-y-auto lg:overflow-y-scroll lg:h-[38vh]">
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
