import React from 'react'
import { useGroupAllSettlementData } from '../../context/context'
import GroupPayerListItem from './GroupPayerListItem'
import GroupOwnerListItem from './GroupOwnerListItem'

export default function GroupAllSettlementList ({ getPersonalSettlement }) {
  const { groupAllSettlementData } = useGroupAllSettlementData()
  const { payerList, ownerList } = groupAllSettlementData

  const mapPayerItem = payerList.map((payerListItem, i) => {
    return (
        <GroupPayerListItem
            key={i}
            payerListItem={payerListItem}
            getPersonalSettlement={getPersonalSettlement}
            num={i}
        />
    )
  })

  const mapOwnerItem = ownerList.map((ownerListItem, i) => {
    return (
        <GroupOwnerListItem
            key={i}
            ownerListItem={ownerListItem}
            getPersonalSettlement={getPersonalSettlement}
            num={i}
        />
    )
  })

  return (
    <div className='settlement-card'>
        <div className='flex justify-between mb-9 font-bold text-black'>
            <h4>
                結算明細
            </h4>
            <button className='hidden md:block btn-primary '>
                結算
            </button>
        </div>
        <div className='overflow-scroll-view'>
            {mapPayerItem}
            {mapOwnerItem}
        </div>
        <button className='md:hidden btn-primary w-full'>
            結算
        </button>
    </div>
  )
}
