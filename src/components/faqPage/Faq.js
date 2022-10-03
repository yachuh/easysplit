import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { Add } from '@mui/icons-material'

export default function Faq () {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
        <div className='viewContainer pt-10'>
            <h2
                className='text-black font-bold text-center mb-14 md:text-left'>
                FAQ 常見問答
            </h2>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<Add sx={{ fontSize: 20 }} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography
                        sx={{ width: '100%', fontSize: 20, fontWeight: 600 }}>
                        所有人都可以使用拆帳趣嗎?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        是的，除了主邀者需為拆帳趣的會員外，邀請的其他人員可以無需註冊使用。
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<Add sx={{ fontSize: 20 }} />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography
                        sx={{ width: '100%', fontSize: 20, fontWeight: 600 }}>
                        拆帳趣須付費嗎?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        免費! 拆帳趣無須付費，若您喜歡拆帳趣，可斗內我們作為支持，我們將萬分感謝。
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<Add sx={{ fontSize: 20 }} />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography
                        sx={{ width: '100%', fontSize: 20, fontWeight: 600 }}>
                        我要怎麼把朋友邀請進來一起使用?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        在你所新增的群組內，新增成員後，由你發請邀請連結給朋友，朋友先於本網站註冊後，點入邀請連結後，進入群組選擇自己的成員角色，即可一起使用拆帳趣功能!
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<Add sx={{ fontSize: 20 }} />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography
                        sx={{ width: '100%', fontSize: 20, fontWeight: 600 }}>
                        我要怎麼知道最後的拆帳金額?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        在結算明細的右上角，點選結算，便可以知道自己目前應該要向誰付款，或是誰應該要支付我，再點選下一步完成結算流程。
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
  )
}
