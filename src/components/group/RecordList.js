import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGroupData } from '../../context/context'
import { getExpenseTypeApi } from '../../utils/api'
import { PaymentRecordItem, SettledRecordItem } from './RecordListItem'
import Modal from '@mui/material/Modal'
import { AddNewExpenseModal } from './GroupModal'
import { Add, CloseOutlined } from '@mui/icons-material'

export default function PaymentRecordList () {
  const { expenseData, settledData } = useGroupData()
  const [expenseTypeList, setExpenseTypeList] = useState([])

  // Modal state
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const handleOpenAddExpenseModal = () => setOpenAddExpenseModal(true)
  const handleCloseAddExpenseModal = () => setOpenAddExpenseModal(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

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
          className="hidden md:block btn-primary"
          onClick={handleOpenAddExpenseModal}>
          <Add sx={{ fontSize: 20 }} />
          新增費用
        </button>
        <Modal
          open={openAddExpenseModal}
          onclose={handleCloseAddExpenseModal}
          onClick={handleCloseAddExpenseModal}
          className="expenseModal-bg">
          <div onClick={(e) => e.stopPropagation()} className="expenseModal">
            <AddNewExpenseModal open={openAddExpenseModal} onClose={handleCloseAddExpenseModal} />
          </div>
        </Modal>
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
