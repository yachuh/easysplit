import React, { useState, useEffect, useCallback } from 'react'
import Modal from '@mui/material/Modal'
import { AttachMoney, CloseOutlined, Volcano } from '@mui/icons-material'
import { useSettlementClickData, useSelfSettlementData, useReminderData } from '../../context/context'
import { ModalSingelDetailSettlement } from './ModalSingelDetailSettlement'
import { ModalReminder } from '../../components/ModalFeedback'
import LoadingModal from '../../components/LoadingModal'

export const SettlementPayerItem = ({ payerListItem }) => {
  const { PayerImageUrl, MemberId, PayerName, ReceivedAmount } = payerListItem

  return (
        <div
            id={MemberId}
            className='flex gap-4 text-base'>
            <img
                className='settlement-userImg btn-shadow'
                src={PayerImageUrl}
                alt='userSettlement'
            />
            <ul className='flex flex-col gap-1'>
                <li>{PayerName}</li>
                <li className='flex items-center'>
                    應取回
                    <span className='ml-3 mr-2 text-colors-fourth'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </span>
                    <span className='text-colors-fourth'>
                        {ReceivedAmount.toFixed(2)}
                    </span>
                </li>
            </ul>
        </div>
  )
}

export const SettlementOwnerItem = ({ ownerListItem }) => {
  const { OwnerImageUrl, OwnerName, GaveAmount } = ownerListItem

  return (
        <div className='flex gap-4 text-base'>
            <img
                className='settlement-userImg btn-shadow'
                src={OwnerImageUrl}
                alt='userSettlement'
            />
            <ul className='flex flex-col gap-1'>
                <li>{OwnerName}</li>
                <li>
                    應支付
                    <span className='ml-3 mr-2 text-red-700'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </span>
                    <span className='text-red-700 text-right'>
                        {GaveAmount.toFixed(2)}
                    </span>
                </li>
            </ul>
        </div>
  )
}

export const PersonalPayerItem = ({ settlementItem, getPersonalSettlement, getGroupAllSettlement, getReminder }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { payerImageUrl, owenerName, ownerMemberId, ownAmountresult, payerMemberId, payerName } = settlementItem
  const { reminderdData, setReminderdData } = useReminderData()
  const { setSettlementClickData } = useSettlementClickData()
  const [pickReminder, setPickReminder] = useState(
    {
      ownerMemberId: null,
      owenerName: '',
      ownAmountresult: null,
      payerMemberId: null,
      payerName: '',
      status: ''
    }
  )

  const [openPersonalPayer, setOpenPersonalPayer] = useState(false)
  const handleOpenPersonalPayer = () => setOpenPersonalPayer(true)
  const handleClosePersonalPayer = () => setOpenPersonalPayer(false)

  const [openReminder, setOpenReminder] = useState(false)
  const handleOpenReminder = () => setOpenReminder(true)
  const handleCloseReminder = () => setOpenReminder(false)

  const settlementClick = () => {
    setIsLoading(true)
    setSettlementClickData(settlementItem)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
    handleOpenPersonalPayer()
  }

  const reminderClick = useCallback(() => {
    setIsLoading(true)
    getReminder(ownerMemberId)
    setPickReminder(pickReminder => ({
      ...pickReminder,
      ownerMemberId,
      payerMemberId
    }))
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    handleOpenReminder()
  }, [ownerMemberId])

  return (
        <>
            {
                isLoading
                  ? <LoadingModal />
                  : <div
                        id={payerMemberId}
                        className='flex gap-4 text-base mb-4'>
                        <img
                            className='settlement-userImg btn-shadow'
                            src={payerImageUrl}
                            alt='userSettlement'
                        />
                        <div className='w-full'>
                            <ul className='flex items-center gap-3 mb-2'>
                                <li className='font-bold'>{payerName}</li>
                                <li className='text-xs'>應取回</li>
                                <li className='text-colors-fourth font-bold'><AttachMoney sx={{ fontSize: 16 }} /></li>
                                <li className='text-colors-fourth ml-[-3px] font-bold'>{ownAmountresult.toFixed(2)}</li>
                                <li className='text-xs'>從</li>
                                <li className='text-xs'>{owenerName}</li>
                            </ul>
                            <div
                                className='flex gap-3.5'>
                                <button
                                    onClick={settlementClick}
                                    className='w-full btn-outline p-2 text-xs'>
                                    結算
                                </button>
                                <Modal
                                    open={openPersonalPayer}
                                    onClose={handleClosePersonalPayer}
                                    className="modalCard-bg">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="modalCard">
                                        <div
                                            onClick={handleClosePersonalPayer}
                                            className="modalCancel">
                                            <CloseOutlined sx={{ fontSize: 14 }} />
                                        </div>
                                        <ModalSingelDetailSettlement
                                            open={openPersonalPayer}
                                            onClose={handleClosePersonalPayer}
                                            getPersonalSettlement={getPersonalSettlement}
                                            getGroupAllSettlement={getGroupAllSettlement}
                                        />
                                    </div>
                                </Modal>
                                <button
                                    id={payerMemberId}
                                    onClick={reminderClick}
                                    className='w-full btn-outline p-2 text-xs'>
                                    發送提醒
                                </button>
                                <Modal
                                    open={openReminder}
                                    onClose={handleCloseReminder}
                                    className="modalCard-bg">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="modalCard">
                                        <div
                                            onClick={handleCloseReminder}
                                            className="modalCancel">
                                            <CloseOutlined sx={{ fontSize: 14 }} />
                                        </div>
                                        <ModalReminder
                                            open={openReminder}
                                            onClose={handleCloseReminder}
                                            pickReminder={pickReminder}
                                            reminderdData={reminderdData}
                                        />
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
            }
        </>

  )
}

export const PersonalOwnerItem = ({ settlementItem, getPersonalSettlement, getGroupAllSettlement, getReminder }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { ownerImageUrl, ownerMemberId, owenerName, ownAmountresult, payerName, payerMemberId } = settlementItem
  const { reminderdData, setReminderdData } = useReminderData()
  const { setSettlementClickData } = useSettlementClickData()

  const [pickReminder, setPickReminder] = useState(
    {
      ownerMemberId: null,
      owenerName: '',
      ownAmountresult: null,
      payerMemberId: null,
      payerName: '',
      status: ''
    }
  )

  const [openPersonalOwner, setOpenPersonalOwner] = useState(false)
  const handleOpenPersonalOwner = () => setOpenPersonalOwner(true)
  const handleClosePersonalOwner = () => setOpenPersonalOwner(false)

  const [openReminder, setOpenReminder] = useState(false)
  const handleOpenReminder = () => setOpenReminder(true)
  const handleCloseReminder = () => setOpenReminder(false)

  const settlementClick = () => {
    setIsLoading(true)
    setSettlementClickData(settlementItem)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
    handleOpenPersonalOwner()
  }

  const reminderClick = useCallback(() => {
    setIsLoading(true)
    getReminder(ownerMemberId)
    setPickReminder(pickReminder => ({
      ...pickReminder,
      ownerMemberId,
      payerMemberId
    }))
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    handleOpenReminder()
  }, [ownerMemberId])

  return (
        <>
            {
                isLoading
                  ? <LoadingModal />
                  : <div
                        id={ownerMemberId}
                        className='flex gap-4 text-base mb-4'>
                        <img
                            className='settlement-userImg btn-shadow'
                            src={ownerImageUrl}
                            alt='userSettlement'
                        />
                        <div className='w-full'>
                            <ul className='flex items-center gap-3 mb-2'>
                                <li className='font-bold'>{owenerName}</li>
                                <li className='text-xs'>應支付</li>
                                <li className='text-red-700 font-bold'><AttachMoney sx={{ fontSize: 16 }} /></li>
                                <li className='text-red-700 ml-[-3px] font-bold'>{ownAmountresult.toFixed(2)}</li>
                                <li className='text-xs'>給</li>
                                <li className='text-xs'>{payerName}</li>
                            </ul>
                            <div className='flex gap-3.5'>
                                <button
                                    onClick={settlementClick}
                                    className='w-full btn-outline p-2 text-xs'>
                                    結算
                                </button>
                                <Modal
                                    open={openPersonalOwner}
                                    onClose={handleClosePersonalOwner}
                                    className="modalCard-bg">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="modalCard">
                                        <div
                                            onClick={handleClosePersonalOwner}
                                            className="modalCancel">
                                            <CloseOutlined sx={{ fontSize: 14 }} />
                                        </div>
                                        <ModalSingelDetailSettlement
                                            open={openPersonalOwner}
                                            onClose={handleClosePersonalOwner}
                                            getPersonalSettlement={getPersonalSettlement}
                                            getGroupAllSettlement={getGroupAllSettlement}
                                        />
                                    </div>
                                </Modal>
                                <button
                                    id={payerMemberId}
                                    onClick={reminderClick}
                                    className='w-full btn-outline p-2 text-xs'>
                                    發送提醒
                                </button>
                                <Modal
                                    open={openReminder}
                                    onClose={handleCloseReminder}
                                    className="modalCard-bg">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="modalCard">
                                        <div
                                            onClick={handleCloseReminder}
                                            className="modalCancel">
                                            <CloseOutlined sx={{ fontSize: 14 }} />
                                        </div>
                                        <ModalReminder
                                            open={openReminder}
                                            onClose={handleCloseReminder}
                                            pickReminder={pickReminder}
                                            reminderdData={reminderdData}
                                        />
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
            }
        </>

  )
}

export const SelfSettlementPayerItem = ({ selfSettlementItem, isActive, setActiveId, setBtnDisable }) => {
  const { selfSettlementData, setSelfSettlementData } = useSelfSettlementData()
  const { settlement } = selfSettlementData

  const { settlementClickData, setSettlementClickData } = useSettlementClickData()
  const [isLoading, setIsLoading] = useState(false)

  const {
    payerMemberId,
    ownerMemberId,
    owenerName,
    ownerImageUrl,
    ownAmountresult
  } = selfSettlementItem

  const settlementClick = () => {
    setIsLoading(true)
    const filterUser = settlement.filter(item => {
      return (ownerMemberId === item.ownerMemberId && payerMemberId === item.payerMemberId)
    })
    setSettlementClickData(filterUser)
    setActiveId(filterUser[0].ownerMemberId)
    setBtnDisable(false)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
        <div
            id={ownerMemberId}
            onClick={settlementClick}
            className={`flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer ${isActive ? 'bg-color-champagne-pink' : 'bg-white'}`}>
            <div className='flex gap-3 items-center'>
                <img
                    className='settlement-userImg w-10 h-10 rounded-full btn-shadow'
                    src={ownerImageUrl}
                    alt='userSettlement'
                />
                <p>{owenerName}</p>
            </div>

            <ul className='flex flex-col items-end'>
                <li>
                    需支付你
                </li>
                <li>
                    <span className='ml-3 mr-2 text-colors-fourth'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </span>
                    <span className='text-colors-fourth'>
                        {ownAmountresult.toFixed(2)}
                    </span>
                </li>
            </ul>
        </div>
  )
}

export const SelfSettlementOwnerItem = ({ selfSettlementItem, isActive, setActiveId, setBtnDisable }) => {
  const { selfSettlementData, setSelfSettlementData } = useSelfSettlementData()
  const { settlement } = selfSettlementData

  const { settlementClickData, setSettlementClickData } = useSettlementClickData()
  const [isLoading, setIsLoading] = useState(false)

  const {
    payerMemberId,
    payerName,
    payerImageUrl,
    ownerMemberId,
    owenerName,
    ownAmountresult
  } = selfSettlementItem

  const settlementClick = (e) => {
    setIsLoading(true)
    const filterUser = settlement.filter(item => {
      return (ownerMemberId === item.ownerMemberId && payerMemberId === item.payerMemberId)
    })
    setSettlementClickData(filterUser)
    setActiveId(filterUser[0].payerMemberId)
    setBtnDisable(false)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
        <div
            id={ownerMemberId}
            data-tab={owenerName}
            onClick={settlementClick}
            className={`flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer ${isActive ? 'bg-color-champagne-pink' : 'bg-white'}`}>
            <div className='flex gap-3 items-center act'>
                <img
                    className='settlement-userImg w-10 h-10 rounded-full btn-shadow'
                    src={payerImageUrl}
                    alt='userSettlement'
                />
                <p>{payerName}</p>
            </div>

            <ul className='flex flex-col items-end'>
                <li>
                    你需支付
                </li>
                <li>
                    <span className='ml-3 mr-2 text-red-700'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </span>
                    <span className='text-red-700'>
                        {ownAmountresult.toFixed(2)}
                    </span>
                </li>
            </ul>
        </div>
  )
}
