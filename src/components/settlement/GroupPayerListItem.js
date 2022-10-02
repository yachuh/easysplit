import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { ExpandMore } from '@mui/icons-material'
import { usePersonalSettlementData, useGroupAllSettlementData } from '../../context/context'
import { SettlementPayerItem, PersonalPayerItem } from './SettlemenItem'
import LoadingModal from '../../components/LoadingModal'

export default function GroupPayerListItem ({ getPersonalSettlement, getGroupAllSettlement, getReminder }) {
  const { personalSettlementData } = usePersonalSettlementData()
  const { settlement } = personalSettlementData
  const { groupAllSettlementData } = useGroupAllSettlementData()
  const { payerList } = groupAllSettlementData
  const [isLoading, setIsLoading] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setIsLoading(true)
    setExpanded(isExpanded ? panel : false)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const mapPersonalItem = settlement.map((settlementItem, i) => {
    return (
      <PersonalPayerItem
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
      {payerList?.map((payerListItem, i) => {
        const { MemberId } = payerListItem
        return (
          <div key={i}>
            {
              isLoading
                ? <LoadingModal />
                : <Accordion
                  key={i}
                  expanded={expanded === i}
                  onChange={handleChange(i)} >
                  <AccordionSummary
                    onClick={() => { getPersonalSettlement(MemberId) }}
                    expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
                    aria-controls='panelbh-content'
                    id='panelbh-header'>
                    <Typography
                      component={'div'}
                      sx={{ width: '100%', fontSize: 20, fontWeight: 600 }}>
                      <SettlementPayerItem payerListItem={payerListItem} />
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography component={'div'}>
                      {mapPersonalItem}
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
