import { useEffect, useState } from 'react'
import { useGroupData } from '../../context/context'
import { getExpenseTypeApi } from '../../utils/api'
import { PaymentRecordItem, SettledRecordItem } from './RecordListItem'

export default function PaymentRecordList () {
  const { groupData, expenseData, settledData } = useGroupData()
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
    <div className='settlement-card w-full'>
      <div className='flex justify-between mb-9 font-bold text-black'>
        <h4>
          費用
        </h4>
        <button
          className='hidden lg:block btn-primary '>
          新增費用
        </button>
      </div>
      <ul className="flex flex-col gap-[23px] p-4 overflow-scroll-view md:h-[240px] md:overflow-y-auto lg:overflow-y-scroll lg:h-[38vh]">
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