import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Modal from '@mui/material/Modal'
import { PayerListModal } from '../GroupModal'
import { CloseOutlined } from '@mui/icons-material'

export default function SelectPayer ({ payerList, setPayerList, watchCost, editModeEnabled }) {
  const [openPayerListPopup, setOpenPayerListPopup] = useState(false)
  const handleOpenPayerListPopup = () => setOpenPayerListPopup(true)
  const handleClosePayerListPopup = () => setOpenPayerListPopup(false)

  const {
    control
  } = useFormContext

  return (
    <Controller
      control={control}
      name=""
      render={({ field }) => (
        <div className="singlePayment-payer mt-7">
          <img className="settlement-userImg w-8 h-8 drop-shadow-[2px_2px_5px_rgba(0,0,0,0.25)]" src={payerList[0].imageUrl} alt="payer" />
          <label>
            <div className="singlePayment-name">
              <button
                disabled={!editModeEnabled}
                className="formInput singlePayment-name py-1 px-4 overflow-hidden text-left text-ellipsis disabled:border-none"
                onClick={ e => {
                  e.preventDefault()
                  handleOpenPayerListPopup()
                }}
              >
                {payerList[0].memberName}
              </button>
            </div>
            {/* SelectPayerModal START */}
            <Modal open={openPayerListPopup} onClose={handleClosePayerListPopup} className="modalCard-bg">
              <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
                <div onClick={handleClosePayerListPopup} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                <PayerListModal open={openPayerListPopup} onClose={handleClosePayerListPopup} payerList={payerList} setPayerList={setPayerList} watchCost={watchCost} />
              </div>
            </Modal>
            {/* SelectPayerModal End */}
          </label>
          <div className="flex items-center gap-3">
            <p>支付</p>
            <p className="ml-auto text-color-dark-green">
              $<span className="ml-2">{watchCost}</span>
            </p>
          </div>
        </div>
      )}
    />
  )
}
