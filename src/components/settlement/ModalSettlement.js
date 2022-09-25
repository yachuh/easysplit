import React, { useState } from 'react'
import { CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import 'react-datepicker/dist/react-datepicker.css'

import { useSelfSettlementData, useGroupData } from '../../context/context'
import { ModalDetailSettlement } from './ModalDetailSettlement'
import { SelfSettlementPayerItem, SelfSettlementOwnerItem } from './SettlemenItem'

export default function ModalSettlement ({ onClose, getPersonalSettlement, getGroupAllSettlement }) {
  const { selfSettlementData } = useSelfSettlementData()
  const { userMemberId, settlement } = selfSettlementData

  const { groupData } = useGroupData()
  const { groupName } = groupData

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const mapSettlementItem = settlement.map((selfSettlementItem, i) => {
    const { payerMemberId } = selfSettlementItem

    return (
      (payerMemberId !== userMemberId) ? <SelfSettlementOwnerItem key={i} selfSettlementItem={selfSettlementItem} /> : <SelfSettlementPayerItem key={i} selfSettlementItem={selfSettlementItem} />
    )
  })

  return (
    <>
      <p className='modalSettlement-title'>
        結算
      </p>
      <p className='w-full text-gray-400 text-left'>請選擇你要結算的對象：</p>
      <input
        id="account"
        className="inputInfo mb-4 pl-4"
        type="text"
        placeholder={groupName}
        disabled="disabled"
      />
      <div
        className='overflow-scroll-view h-[190px] mb-8 w-full border border-colors-primary rounded'>
        {mapSettlementItem}
      </div>
      <div className='w-full flex justify-between gap-4'>
        <button
          onClick={onClose}
          className="btn-outline w-full">
          取消
        </button>
        <button
          onClick={handleOpen}
          className="btn-primary w-full">
          下一步
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          className='modalCard-bg'>
          <div
            onClick={(e) => e.stopPropagation()}
            className='modalCard'>
            <div
              onClick={handleClose}
              className="modalCancel">
              <CloseOutlined sx={{ fontSize: 14 }} />
            </div>
            <ModalDetailSettlement
              open={open}
              onClose={handleClose}
              getPersonalSettlement={getPersonalSettlement}
              getGroupAllSettlement={getGroupAllSettlement}
            />
          </div>
        </Modal>
      </div>
    </>
  )
}
