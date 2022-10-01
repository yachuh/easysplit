import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { ExpandMore } from '@mui/icons-material'
import { usePersonalSettlementData, useGroupAllSettlementData } from '../../context/context'
import { PersonalOwnerItem, SettlementOwnerItem } from './SettlemenItem'
import LoadingModal from '../../components/LoadingModal'

export default function GroupOwnerListItem ({ getPersonalSettlement, getGroupAllSettlement, getReminder }) {
  const { personalSettlementData } = usePersonalSettlementData()
  const { settlement } = personalSettlementData
  const { groupAllSettlementData } = useGroupAllSettlementData()
  const { ownerList } = groupAllSettlementData
  const [isLoading, setIsLoading] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setIsLoading(true)
    setExpanded(isExpanded ? panel : false)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const mapPersonalOwnerItem = settlement.map((settlementItem, i) => {
    return (
      <PersonalOwnerItem
        key={i}
        settlementItem={settlementItem}
        getPersonalSettlement={getPersonalSettlement}
        getGroupAllSettlement={getGroupAllSettlement}
        getReminder={getReminder}
      />
    )
  })

  return (
    <>
      {ownerList?.map((ownerListItem, i) => {
        const { MemberId } = ownerListItem
        return (
          <div key={i}>
            {
              isLoading
                ? <LoadingModal />
                : <Accordion
                  key={i}
                  expanded={expanded === i}
                  onChange={handleChange(i)}>
                  <AccordionSummary
                    onClick={() => { getPersonalSettlement(MemberId) }}
                    expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
                    aria-controls='panelbh-content'
                    id='panelbh-header'>
                    <Typography
                      component={'div'}
                      sx={{ width: '100%', fontSize: 20, fontWeight: 600 }}>
                      <SettlementOwnerItem ownerListItem={ownerListItem} />
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography component={'div'}>
                      {mapPersonalOwnerItem}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
            }
          </div>
        )
      })}
    </>
  )
}
