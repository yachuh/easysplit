import { useState } from 'react'
import { useGroupData } from '../../context/context'
import { ExpenseRecordItem, SettledRecordItem } from './RecordListItem'
import Modal from '@mui/material/Modal'
import AddExpenseModal from './expense/AddExpenseModal'
import { Add } from '@mui/icons-material'
import LoadingModal from '../../components/LoadingModal'

export default function RecordList () {
  const { expenseData, settledData, expenseTypeList } = useGroupData()

  /* ---- Modal 相關 START ---- */
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const handleOpenAddExpenseModal = () => setOpenAddExpenseModal(true)
  const handleCloseAddExpenseModal = () => setOpenAddExpenseModal(false)
  /* ---- Modal 相關 END ---- */

  const mergeCreatDate = (expenseData).concat(settledData)
  console.log('expenseData :>> ', expenseData)
  console.log('settledData :>> ', settledData)
  console.log('expenseTypeList :>> ', expenseTypeList)

  // mergeCreatDate.sort((a, b) => b.creatDate.localeCompare(a.creatDate) || b.creatDate.localeCompare(a.creatDate))

  // console.log('mergeCreatDate :>> ', mergeCreatDate)

  return (
    <div className="w-full settlement-card lg:w-3/5">
      {/* ---- 費用 header ---- */}
      <div className="flex justify-between mb-3 font-bold text-black">
        <h3 className="text-2xl font-bold">費用</h3>
        <button
          className="hidden md:block btn-primary"
          onClick={handleOpenAddExpenseModal}>
          <Add sx={{ fontSize: 20 }} />
          新增費用
        </button>
        {/* AddExpenseModal START */}
        <Modal
          open={openAddExpenseModal}
          onClose={handleCloseAddExpenseModal}
          onClick={handleCloseAddExpenseModal}
          className="modalCard-bg"
        >
          <div onClick={(e) => e.stopPropagation()} className="expenseModal">
            <AddExpenseModal open={openAddExpenseModal} onClose={handleCloseAddExpenseModal} />
          </div>
        </Modal>
        {/* AddExpenseModal END */}
      </div>
      <ul className='overflow-scroll-view md:h-[40vh] lg:overflow-y-scroll lg:h-[85%]'>
        {/* {
          mergeCreatDate?.map((mergeItem, i) => {
            console.log('mergeCreatDate :>> ', mergeItem.item)
            return (
              <div key={i}>
                {
                  expenseData.expenseId === mergeItem.expenseId ? <ExpenseRecordItem key={i} mergeItem={mergeItem} expenseTypeList={expenseTypeList} /> : <SettledRecordItem key={i} mergeItem={mergeItem} />
                }
              </div>
            )
          })
        } */}

        {
          // expense record
          expenseData?.map((item, i) => {
            return (
              <ExpenseRecordItem key={i} {...item} expenseTypeList={expenseTypeList} />
            )
          })
        }
        {
          // settled record
          settledData?.map((item, i) => {
            return (
              <SettledRecordItem key={i} {...item} />
            )
          })
        }
      </ul>
    </div>
  )
}
