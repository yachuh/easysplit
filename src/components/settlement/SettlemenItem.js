import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import { AttachMoney, CloseOutlined } from '@mui/icons-material'
import { useSettlementClickData, useSelfSettlementData } from '../../context/context'
import ModalSettlement from './ModalSettlement'

export const SettlementPayerItem = ({ payerListItem }) => {
  const { PayerImageUrl, MemberId, PayerName, ReceivedAmount } = payerListItem

  return (
        <div
            id={MemberId}
            className='flex gap-4 text-base'>
            <img
                className='settlement-userImg'
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
                        {ReceivedAmount}
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
                className='settlement-userImg'
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
                        {GaveAmount}
                    </span>
                </li>
            </ul>
        </div>
  )
}

export const PersonalPayerItem = ({ settlementItem }) => {
  const { payerImageUrl, owenerName, ownAmountresult, payerMemberId, payerName } = settlementItem

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <div
            id={payerMemberId}
            className='flex gap-4 text-base mb-4'>
            <img
                className='settlement-userImg'
                src={payerImageUrl}
                alt='userSettlement'
            />
            <div className='w-full'>
                <ul className='flex items-center gap-3 mb-2'>
                    <li className='font-bold'>{payerName}</li>
                    <li className='text-xs'>應取回</li>
                    <li className='text-colors-fourth font-bold'><AttachMoney sx={{ fontSize: 16 }} /></li>
                    <li className='text-colors-fourth ml-[-3px] font-bold'>{ownAmountresult}</li>
                    <li className='text-xs'>從</li>
                    <li className='text-xs'>{owenerName}</li>
                </ul>
                <div
                    onClick={handleOpen}
                    className='flex gap-3.5'>
                    <button
                        className='w-full btn-outline p-2 text-xs'>
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
                    <button className='w-full btn-outline p-2 text-xs'>發送提醒</button>
                </div>
            </div>
        </div>
  )
}

export const PersonalOwnerItem = ({ settlementItem }) => {
  const { ownerImageUrl, ownerMemberId, owenerName, ownAmountresult, payerName } = settlementItem

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
        <div
            id={ownerMemberId}
            className='flex gap-4 text-base mb-4'>
            <img
                className='settlement-userImg'
                src={ownerImageUrl}
                alt='userSettlement'
            />
            <div className='w-full'>
                <ul className='flex items-center gap-3 mb-2'>
                    <li className='font-bold'>{owenerName}</li>
                    <li className='text-xs'>應支付</li>
                    <li className='text-red-700 font-bold'><AttachMoney sx={{ fontSize: 16 }} /></li>
                    <li className='text-red-700 ml-[-3px] font-bold'>{ownAmountresult}</li>
                    <li className='text-xs'>給</li>
                    <li className='text-xs'>{payerName}</li>
                </ul>
                <div className='flex gap-3.5'>
                    <button
                        onClick={handleOpen}
                        className='w-full btn-outline p-2 text-xs'>
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
                    <button className='w-full btn-outline p-2 text-xs'>發送提醒</button>
                </div>
            </div>
        </div>
  )
}

export const SelfSettlementPayerItem = ({ selfSettlementItem }) => {
  const { selfSettlementData, setSelfSettlementData } = useSelfSettlementData()
  const { settlement } = selfSettlementData

  const { settlementClickData, setSettlementClickData } = useSettlementClickData()

  const {
    payerMemberId,
    ownerMemberId,
    owenerName,
    ownerImageUrl,
    ownAmountresult
  } = selfSettlementItem

  const settlementClick = () => {
    const filterUser = settlement.filter(item => {
      return (ownerMemberId === item.ownerMemberId && payerMemberId === item.payerMemberId)
    })
    setSettlementClickData(filterUser)
  }

  console.log('settlementClickData:>> ', settlementClickData)

  return (
        <div
            id={ownerMemberId}
            onClick={settlementClick}
            className='flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer hover:bg-colors-fifth/20 useEven' >
            <div className='flex gap-3 items-center'>
                <img

                    className='settlement-userImg w-10 h-10'
                    src={ownerImageUrl}
                    alt='userSettlement'
                />
                <p>{owenerName}</p>
            </div>

            <ul className='flex flex-col items-end'>
                <li>
                    需支付你
                </li>
                <li >
                    <span className='ml-3 mr-2 text-colors-fourth'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </span>
                    <span className='text-colors-fourth'>
                        {ownAmountresult}
                    </span>
                </li>
            </ul>
        </div>
  )
}

export const SelfSettlementOwnerItem = ({ selfSettlementItem }) => {
  const { selfSettlementData, setSelfSettlementData } = useSelfSettlementData()
  const { settlement } = selfSettlementData

  const { settlementClickData, setSettlementClickData } = useSettlementClickData()

  const {
    payerMemberId,
    payerName,
    payerImageUrl,
    ownerMemberId,
    owenerName,
    ownAmountresult
  } = selfSettlementItem

  const settlementClick = () => {
    const filterUser = settlement.filter(item => {
      return (ownerMemberId === item.ownerMemberId && payerMemberId === item.payerMemberId)
    })
    setSettlementClickData(filterUser)
  }

  return (
        <div
            id={ownerMemberId}
            data-tab={owenerName}
            onClick={settlementClick}
            className='flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer hover:bg-colors-fifth/20 useEven'>
            <div id={payerMemberId} className='flex gap-3 items-center'>
                <img
                    id={payerMemberId}
                    className='settlement-userImg'
                    src={payerImageUrl}
                    alt='userSettlement'
                />
                <p id={payerMemberId}>{payerName}</p>
            </div>

            <ul id={payerMemberId} className='flex flex-col items-end'>
                <li id={payerMemberId}>
                    你需支付
                </li>
                <li id={payerMemberId}>
                    <span id={payerMemberId} className='ml-3 mr-2 text-red-700'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </span>
                    <span id={payerMemberId} className='text-red-700'>
                        {ownAmountresult}
                    </span>
                </li>
            </ul>
        </div>
  )
}
