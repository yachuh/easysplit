import React, { useState } from 'react'
import { AttachMoney } from '@mui/icons-material'
import userSettlement from '../../image/userSettlement.svg'

export const SettlementPayerItem = ({ payerListItem }) => {
  const { PayAmount, MemberId, PayerName, ReceivedAmount } = payerListItem

  return (
        <div
            id={MemberId}
            className='flex gap-4 text-base'>
            <img
                className='w-12'
                src={userSettlement}
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
  const { OwnerName, MemberId, GaveAmount } = ownerListItem
  return (
        <div className='flex gap-4 text-base'>
            <img
                className='w-12'
                src={userSettlement}
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
  const { ownerMemberId, owenerName, ownAmountresult, payerMemberId, payerName, status } = settlementItem
  return (
        <div
            id={payerMemberId}
            className='flex gap-4 text-base'>
            <img
                className='w-12'
                src={userSettlement}
                alt='userSettlement'
            />
            <div>
                <ul className='flex items-center gap-3 mb-4'>
                    <li className='font-bold'>{payerName}</li>
                    <li className='text-xs'>應取回</li>
                    <li className='text-colors-fourth font-bold'><AttachMoney sx={{ fontSize: 16 }} /></li>
                    <li className='text-colors-fourth ml-[-3px] font-bold'>{ownAmountresult}</li>
                    <li className='text-xs'>從</li>
                    <li className='text-xs'>{owenerName}</li>
                </ul>
                <div className='flex gap-3.5'>
                    <button className='w-full btn-outline p-2 text-xs'>結算</button>
                    <button className='w-full btn-outline p-2 text-xs'>發送提醒</button>
                </div>
            </div>
        </div>
  )
}

export const PersonalOwnerItem = ({ settlementItem }) => {
  const { ownerMemberId, owenerName, ownAmountresult, payerMemberId, payerName, status } = settlementItem
  return (
        <div
            id={ownerMemberId}
            className='flex gap-4 text-base'>
            <img
                className='w-12'
                src={userSettlement}
                alt='userSettlement'
            />
            <div>
                <ul className='flex items-center gap-3 mb-4'>
                    <li className='font-bold'>{owenerName}</li>
                    <li className='text-xs'>應支付</li>
                    <li className='text-red-700 font-bold'><AttachMoney sx={{ fontSize: 16 }} /></li>
                    <li className='text-red-700 ml-[-3px] font-bold'>{ownAmountresult}</li>
                    <li className='text-xs'>給</li>
                    <li className='text-xs'>{payerName}</li>
                </ul>
                <div className='flex gap-3.5'>
                    <button className='w-full btn-outline p-2 text-xs'>結算</button>
                    <button className='w-full btn-outline p-2 text-xs'>發送提醒</button>
                </div>
            </div>
        </div>
  )
}
