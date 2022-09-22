import React from 'react'
import { useGroupAllSettlementData } from '../../context/context'
import GroupPayerListItem from './GroupPayerListItem'
import GroupOwnerListItem from './GroupOwnerListItem'

export default function GroupAllSettlementList ({ getPersonalSettlement }) {
  const { groupAllSettlementData } = useGroupAllSettlementData()
  const { settlementList, payerList, ownerList } = groupAllSettlementData

  const mapPayerItem = payerList.map((payerListItem, i) => {
    console.log(payerListItem)

    return (
        <GroupPayerListItem
            key={i}
            payerListItem={payerListItem}
            getPersonalSettlement={getPersonalSettlement}
        />
    )
  })
  console.log(mapPayerItem)

  const mapOwnerItem = ownerList.map((ownerListItem, i) => {
    return (
        <GroupOwnerListItem
            key={i}
            ownerListItem={ownerListItem}
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
