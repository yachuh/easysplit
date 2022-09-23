import React, { useState, useEffect } from 'react'
import { AttachMoney, ArrowCircleDown } from '@mui/icons-material'

import { usePersonalSettlementData, useGroupAllSettlementData } from '../../context/context'
// import { SettlementPayerItem } from './SettlemenItem'
import userSettlement from '../../image/userSettlement.svg'

export const ModalSettlement = ({ onClose, getPersonalSettlement }) => {
  const { groupAllSettlementData } = useGroupAllSettlementData()
  const { payerList, ownerList } = groupAllSettlementData

  const { personalSettlementData, setPersonalSettlementData } = usePersonalSettlementData()
  const { settlement } = personalSettlementData

  // "ownerMemberId": 79,
  //     "owenerName": "KIMI",
  //         "ownerImageUrl": "https://easysplit.rocket-coding.com/upload/UserAvatar/defaultprofile.jpg",
  //             "ownAmountresult": 400.0,
  //                 "payerMemberId": 78,
  //                     "payerName": "舒馬克",
  //                         "payerImageUrl": "https://easysplit.rocket-coding.com/upload/UserAvatar/defaultprofile.jpg",
  //                             "status": "舒馬克須向KIMI取回400元"

  useEffect(() => {
    getPersonalSettlement(78)
  }, [])

  console.log(personalSettlementData)

  // const mapSettlementPayerItem = settlement.map((personalsettlementItem, i) => {
  //   const {
  //     ownerMemberId,
  //     owenerName,
  //     ownerImageUrl,
  //     ownAmountresult,
  //     payerMemberId,
  //     payerName,
  //     payerImageUrl
  //   } = personalsettlementItem

  //   return (
  //           <div
  //               key={i}
  //               id={MemberId}
  //               className='flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer hover:bg-colors-fifth/20'>
  //               <div className='flex gap-3 items-center'>
  //                   <img
  //                       className='settlement-userImg'
  //                       src={PayerImageUrl}
  //                       alt='userSettlement'
  //                   />
  //                   <p>{PayerName}</p>
  //               </div>

  //               <ul className='flex flex-col items-end'>
  //                   <li>
  //                       需支付你
  //                   </li>
  //                   <li>
  //                       <span className='ml-3 mr-2 text-colors-fourth'>
  //                           <AttachMoney sx={{ fontSize: 16 }} />
  //                       </span>
  //                       <span className='text-colors-fourth'>
  //                           {ReceivedAmount}
  //                       </span>
  //                   </li>
  //               </ul>
  //           </div>
  //   )
  // })

  //   const mapSettlementOwnerItem = ownerList.map((ownerListItem, i) => {
  //       const { OwnerImageUrl, OwnerName, MemberId, GaveAmount } = ownerListItem
  //       return (
  //           <div
  //               key={i}
  //               id={MemberId}
  //               className='flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer hover:bg-colors-fifth/20'>
  //               <div className='flex gap-3 items-center'>
  //                   <img
  //                       className='settlement-userImg'
  //                       src={OwnerImageUrl}
  //                       alt='userSettlement'
  //                   />
  //                   <p>{OwnerName}</p>
  //               </div>

  //               <ul className='flex flex-col items-end'>
  //                   <li>
  //                       你需支付
  //                   </li>
  //                   <li>
  //                       <span className='ml-3 mr-2 text-colors-fourth'>
  //                           <AttachMoney sx={{ fontSize: 16 }} />
  //                       </span>
  //                       <span className='text-colors-fourth'>
  //                           {GaveAmount}
  //                       </span>
  //                   </li>
  //               </ul>
  //           </div>
  //       )
  //   })

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
                value='不能改'
                disabled="disabled"
            />
            <div className='overflow-scroll-view h-[190px] mb-8 w-full border border-colors-primary rounded'>
                {/* {mapSettlementPayerItem} */}
            </div>
            <div className='w-full flex justify-between gap-4'>
                <button
                    onClick={onClose}
                    className="btn-outline w-full">
                    取消
                </button>
                <button
                    className="btn-primary w-full">
                    下一步
                </button>
            </div>
        </>
  )
}

export const ModalDetailSettlement = () => {
  return (
        <div className='w-full'>
            <p className='modalSettlement-title'>結算</p>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-colors-primary'>From</p>
                <div className='flex gap-3 items-center'>
                    <img
                        className='settlement-userImg'
                        src={userSettlement}
                        alt='userSettlement'
                    />
                    <p className='font-bold text-black'>蔡一零</p>
                </div>
            </div>
            <p className='text-gray-400 text-left'>支付</p>
            <div className='flex justify-between items-center mb-4 gap-1'>
                <p className='w-[25%] font-bold text-colors-primary'>NTD $</p>
                <input
                    id="account"
                    className="inputInfo pl-4 w-[75%]"
                    type="text"
                    value='不能改'
                />
            </div>
            <div className='py-4 text-center text-colors-primary'>
                <ArrowCircleDown sx={{ fontSize: 30 }} />
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-colors-primary'>To</p>
                <div className='flex gap-3 items-center'>
                    <img
                        className='settlement-userImg'
                        src={userSettlement}
                        alt='userSettlement'
                    />
                    <p className='font-bold text-black'>粥杰倫</p>
                </div>
            </div>
            <p className='text-gray-400 text-left mb-2'>的收款方式</p>
            <select id="area" className="inputInfo px-4 text-black">
                <option value='0'>銀行轉帳</option>
                <option value='1'>現金面交</option>
                <option value='2'>LinePay</option>
            </select>

            <div className='w-full flex justify-between gap-4'>
                <button
                    // onClick={onClose}
                    className="btn-outline w-full">
                    取消
                </button>
                <button
                    className="btn-primary w-full">
                    確認
                </button>
            </div>
        </div>
  )
}
