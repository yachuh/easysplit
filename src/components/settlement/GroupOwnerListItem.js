import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { ExpandMore, AttachMoney } from '@mui/icons-material'
import userSettlement from '../../image/userSettlement.svg'

export default function GroupOwnerListItem ({ ownerListItem }) {
  const { OwnAmount, MemberId, GaveAmount } = ownerListItem

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const SettlementOwnerItem = () => {
    return (
            <div className='flex gap-4 text-base'>
                <img
                    className='w-12'
                    src={userSettlement}
                    alt='userSettlement'
                />
                <ul className='flex flex-col gap-1'>
                    <li>{MemberId}</li>
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

  return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography
                        component={'div'}
                        sx={{ width: '100%', fontSize: 20, fontWeight: 600 }}>
                        <SettlementOwnerItem />
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography>
                        是的，除了主邀者需為拆帳趣的會員外，邀請的其他人員可以無需註冊使用。
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
  )
}
