import React, { useState, useEffect } from 'react'
import { useGroupData } from '../../context/context'
import { ExpenseRecordItem, SettledRecordItem } from './RecordListItem'
import Modal from '@mui/material/Modal'
import AddExpenseModal from './expense/AddExpenseModal'
import { Add } from '@mui/icons-material'
import LoadingModal from '../../components/LoadingModal'

export default function RecordList () {
  const { expenseData, settledData, expenseTypeList } = useGroupData()
  const [isLoading, setIsLoading] = useState(false)

  /* ---- Modal 相關 START ---- */
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const handleOpenAddExpenseModal = () => setOpenAddExpenseModal(true)
  const handleCloseAddExpenseModal = () => setOpenAddExpenseModal(false)

  const [openAddExpenseModalSm, setOpenAddExpenseModalSm] = useState(false)
  const handleOpenAddExpenseModalSm = () => setOpenAddExpenseModalSm(true)
  const handleCloseAddExpenseModalSm = () => setOpenAddExpenseModalSm(false)
  /* ---- Modal 相關 END ---- */

  const mergeCreatDate = (expenseData)?.concat(settledData)
  console.log('merge:::', mergeCreatDate)
  mergeCreatDate?.sort((a, b) => b.creatDate.localeCompare(a.creatDate) || b.creatDate.localeCompare(a.creatDate))

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

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
        {
          mergeCreatDate
            ? mergeCreatDate?.map((mergeItem, i) => {
              return (
              <div key={i}>
                {isLoading
                  ? <LoadingModal />
                  : mergeItem.expenseId !== undefined ? <ExpenseRecordItem key={i} {...mergeItem} expenseTypeList={expenseTypeList} /> : <SettledRecordItem key={i} {...mergeItem} />
                }
              </div>
              )
            })
            : <div className="text-center mt-8">
                <h4 className="font-semibold mb-3">尚無紀錄</h4>
                <p>點擊「新增費用」來建立你的第一筆費用吧！</p>
              </div>
        }
        {/* {
          mergeCreatDate?.map((mergeItem, i) => {
            return (
              <div key={i}>

                {isLoading
                  ? <LoadingModal />
                  : mergeItem.expenseId !== undefined ? <ExpenseRecordItem key={i} {...mergeItem} expenseTypeList={expenseTypeList} /> : <SettledRecordItem key={i} {...mergeItem} />
                }

              </div>
            )
          })
        } */}

        {/* {
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
        } */}
      </ul>

      <button
        className='md:hidden btn-primary w-full'
        onClick={handleOpenAddExpenseModalSm}>
        <Add sx={{ fontSize: 20 }} />
        新增費用
      </button>
      <Modal
        open={openAddExpenseModalSm}
        onClose={handleCloseAddExpenseModalSm}
        onClick={handleCloseAddExpenseModalSm}
        className="modalCard-bg"
      >
        <div onClick={(e) => e.stopPropagation()} className="expenseModal">
          <AddExpenseModal open={openAddExpenseModalSm} onClose={handleCloseAddExpenseModalSm} />
        </div>
      </Modal>
    </div>
  )
}
