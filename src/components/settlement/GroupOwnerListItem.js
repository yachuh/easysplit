import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { ExpandMore } from '@mui/icons-material'
import { usePersonalSettlementData } from '../../context/context'
import { PersonalOwnerItem, SettlementOwnerItem } from './SettlemenItem'
import userSettlement from '../../image/userSettlement.svg'

export default function GroupOwnerListItem ({ ownerListItem, getPersonalSettlement, num }) {
  const { MemberId } = ownerListItem
  const { personalSettlementData } = usePersonalSettlementData()
  const { settlement } = personalSettlementData

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
    getPersonalSettlement(MemberId)
  }

  const mapPersonalOwnerItem = settlement.map((settlementItem, i) => {
    return (
            <PersonalOwnerItem
                key={i}
                settlementItem={settlementItem}
            />
    )
  })

  return (
        <>
            <Accordion expanded={expanded === `panel${num + 1}`} onChange={handleChange(`panel${num + 1}`)}>
                <AccordionSummary
                    expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
                    aria-controls={`panel${num + 1}bh-content`}
                    id={`panel${num + 1}bh-header`}
                >
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
        </>
  )
}
