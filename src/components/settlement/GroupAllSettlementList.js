import React, { useState, useEffect, useCallback } from 'react'
import Modal from '@mui/material/Modal'
import { CloseOutlined } from '@mui/icons-material'
import { useGroupData, selfSettlementDataContext, reminderdDataContext } from '../../context/context'
import GroupPayerListItem from './GroupPayerListItem'
import GroupOwnerListItem from './GroupOwnerListItem'
import ModalSettlement from './ModalSettlement'
import { getSelfSettlementApi, getReminderApi } from '../../utils/api'
import LoadingModal from '../LoadingModal'

export default function GroupAllSettlementList ({ getPersonalSettlement, getGroupAllSettlement, groupAllSettlementData }) {
  // console.log(groupAllSettlementData)
  const [isLoading, setIsLoading] = useState(false)
  const { groupData } = useGroupData()
  const { groupId } = groupData

  const [selfSettlementData, setSelfSettlementData] = useState({
    userMemberId: null,
    settlement: [],
    notInvolved: []
  })

  const [reminderdData, setReminderData] = useState({
    settlementReminder: []
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openMd, setOpenMd] = useState(false)
  const handleOpenMd = () => setOpenMd(true)
  const handleCloseMd = () => setOpenMd(false)

  const getSelfSettlement = useCallback(async (groupId) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, userMemberId, settlement, notInvolved } = await getSelfSettlementApi(groupId)
      if (!isSuccess) {
        return
      }
      setSelfSettlementData(selfSettlementData => ({
        ...selfSettlementData,
        userMemberId,
        settlement,
        notInvolved
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [groupId])

  const getReminder = useCallback(async (ownerId) => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, settlementReminder } = await getReminderApi(ownerId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setReminderData(reminderdData => ({
        ...reminderdData,
        settlementReminder
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    if (groupId) {
      getSelfSettlement(groupId)
    }
  }, [groupId])

  return (
    <selfSettlementDataContext.Provider value={{ selfSettlementData, setSelfSettlementData }}>
      <reminderdDataContext.Provider value={{ reminderdData, setReminderData }}>
        <div className='settlement-card lg:w-2/5 mb-3 lg:mb-0'>
          <div className='flex justify-between mb-3 font-bold text-black'>
            <h4>結算明細</h4>
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
                  getGroupAllSettlement={getGroupAllSettlement}
                />
              </div>
            </Modal>
          </div>
          {
            groupAllSettlementData.settlementList
              ? <div className='overflow-scroll-view md:h-[40vh] lg:overflow-y-scroll lg:h-[85%]'>
            <GroupPayerListItem
              getPersonalSettlement={getPersonalSettlement}
              getGroupAllSettlement={getGroupAllSettlement}
              getReminder={getReminder}
            />
            <GroupOwnerListItem
              getPersonalSettlement={getPersonalSettlement}
              getGroupAllSettlement={getGroupAllSettlement}
              getReminder={getReminder}
            />
          </div>
              : <div className="text-center mt-8">
                <h4 className="font-semibold mb-3">尚無紀錄</h4>
                <p>目前沒有未結算的款項</p>
              </div>
          }

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
              <ModalSettlement
                open={open}
                onClose={handleClose}
                getPersonalSettlement={getPersonalSettlement}
                getGroupAllSettlement={getGroupAllSettlement}
              />
            </div>
          </Modal>
        </div>
      </reminderdDataContext.Provider>
    </selfSettlementDataContext.Provider>
  )
}
