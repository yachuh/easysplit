import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { ExpandMore } from '@mui/icons-material'
import { usePersonalSettlementData } from '../../context/context'
import { SettlementPayerItem, PersonalPayerItem } from './SettlemenItem'

export default function GroupPayerListItem ({ payerListItem, getPersonalSettlement }) {
  const { MemberId, i } = payerListItem
  const { personalSettlementData, setPersonalSettlementData } = usePersonalSettlementData()
  const { settlement } = personalSettlementData
  //   const { ownerMemberId, owenerName, ownAmountresult, payerMemberId, payerName, status } = settlementItem

  const [expanded, setExpanded] = useState(false)

  const mapPersonalItem = settlement.map((settlementItem, i) => {
    console.log(settlementItem)
    return (
            <PersonalPayerItem
                key={i}
                settlementItem={settlementItem}
            />
    )
  })

  console.log(mapPersonalItem)

  const handleChange = (panel) => (event, isExpanded) => {
    getPersonalSettlement(MemberId)

    setExpanded(isExpanded ? panel : false)
  }

  console.log(personalSettlementData)

  return (
        <Accordion
            expanded={expanded === 'panel'}
            onChange={handleChange('panel')}>
            <AccordionSummary
                expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
                aria-controls="panelbh-content"
                id={MemberId}>
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
  )
}
