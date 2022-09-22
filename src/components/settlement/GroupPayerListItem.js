import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { ExpandMore } from '@mui/icons-material'
import { usePersonalSettlementData } from '../../context/context'
import { SettlementPayerItem, PersonalPayerItem } from './SettlemenItem'

export default function GroupPayerListItem ({ payerListItem, getPersonalSettlement, num }) {
  const { MemberId } = payerListItem
  const { personalSettlementData } = usePersonalSettlementData()
  const { settlement } = personalSettlementData

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
    getPersonalSettlement(MemberId)
  }

  const mapPersonalItem = settlement.map((settlementItem, i) => {
    return (
            <PersonalPayerItem
                key={i}
                settlementItem={settlementItem}
            />
    )
  })

  return (
        <Accordion
            expanded={expanded === `panel${num + 1}`}
            onChange={handleChange(`panel${num + 1}`)}>
            <AccordionSummary
                expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
                aria-controls={`panel${num + 1}bh-content`}
                id={`panel${num + 1}bh-header`}>
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
