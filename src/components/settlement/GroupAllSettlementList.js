import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import { CloseOutlined } from '@mui/icons-material'
import { usePersonalSettlementData } from '../../context/context'
import GroupPayerListItem from './GroupPayerListItem'
import GroupOwnerListItem from './GroupOwnerListItem'
import { ModalSettlement } from './ModalSettlement'

export default function GroupAllSettlementList ({ getPersonalSettlement }) {
  const { personalSettlementData, setPersonalSettlementData } = usePersonalSettlementData()
  const { settlement } = personalSettlementData

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openMd, setOpenMd] = useState(false)
  const handleOpenMd = () => {
    getPersonalSettlement(78)
    setOpenMd(true)
  }

  console.log(settlement)
  const handleCloseMd = () => setOpenMd(false)

  return (
        <div className='settlement-card'>
            <div className='flex justify-between mb-9 font-bold text-black'>
                <h4>
                    結算明細
                </h4>
                <button
                    onClick={handleOpenMd}
                    className='hidden md:block btn-primary '>
                    結算
                </button>
                <Modal
                    open={openMd}
                    onClose={handleCloseMd}
                    className="modalCard-bg">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="modalCard">
                        <div
                            onClick={handleCloseMd}
                            className="modalCancel">
                            <CloseOutlined sx={{ fontSize: 14 }} />
                        </div>
                        <ModalSettlement
                            open={openMd}
                            onClose={handleCloseMd}
                            getPersonalSettlement={getPersonalSettlement}
                        />
                    </div>
                </Modal>
            </div>
            <div className='overflow-scroll-view'>
                <GroupPayerListItem
                    getPersonalSettlement={getPersonalSettlement}
                />
                <GroupOwnerListItem
                    getPersonalSettlement={getPersonalSettlement}
                />
            </div>

            <button
                onClick={handleOpen}
                className='md:hidden btn-primary w-full'>
                結算
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                className="modalCard-bg">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="modalCard">
                    <div
                        onClick={handleClose}
                        className="modalCancel">
                        <CloseOutlined sx={{ fontSize: 14 }} />
                    </div>
                    <ModalSettlement open={open} onClose={handleClose} />
                </div>
            </Modal>
        </div>
  )
}
