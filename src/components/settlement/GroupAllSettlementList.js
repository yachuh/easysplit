import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import { CloseOutlined } from '@mui/icons-material'
import { useGroupData, selfSettlementDataContext } from '../../context/context'
import GroupPayerListItem from './GroupPayerListItem'
import GroupOwnerListItem from './GroupOwnerListItem'
import ModalSettlement from './ModalSettlement'
import { getSelfSettlementApi } from '../../utils/api'

export default function GroupAllSettlementList ({ getPersonalSettlement }) {
  const { groupData } = useGroupData()
  const { groupId } = groupData

  const [selfSettlementData, setSelfSettlementData] = useState({
    userMemberId: null,
    settlement: [],
    notInvolved: []
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openMd, setOpenMd] = useState(false)
  const handleOpenMd = () => setOpenMd(true)

  const handleCloseMd = () => setOpenMd(false)

  const getSelfSettlement = async (groupId) => {
    try {
      const { status: isSuccess, message, userMemberId, settlement, notInvolved } = await getSelfSettlementApi(groupId)
      if (!isSuccess) {
        return
      }
      console.log(message)
      console.log(userMemberId)
      setSelfSettlementData(selfSettlementData => ({
        ...selfSettlementData,
        userMemberId,
        settlement,
        notInvolved
      }))
    } catch (error) {
      console.log(error)
    }
  }

  console.log(selfSettlementData)

  useEffect(() => {
    if (groupId) {
      getSelfSettlement(groupId)
    }
  }, [groupId])

  return (
    <selfSettlementDataContext.Provider value={{ selfSettlementData, setSelfSettlementData }}>
      <div className='settlement-card w-full'>
        <div className='flex justify-between mb-9 font-bold text-black'>
          <h4>結算明細</h4>
          <button
            onClick={handleOpenMd}
            className='hidden lg:block btn-primary '>
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
        <div className='overflow-scroll-view md:h-[240px] md:overflow-y-auto lg:overflow-y-scroll lg:h-[38vh]'>
          <GroupPayerListItem
            getPersonalSettlement={getPersonalSettlement}
          />
          <GroupOwnerListItem
            getPersonalSettlement={getPersonalSettlement}
          />
        </div>

        <button
          onClick={handleOpen}
          className='lg:hidden btn-primary w-full'>
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
    </selfSettlementDataContext.Provider>

  )
}
