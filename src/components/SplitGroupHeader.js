import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function TabPanel (props) {
  const { children, value, index, classes, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function SplitGroupHeader () {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box className='w-full'>
      <Box >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab
            className='w-1/3'
            label="總覽" {...a11yProps(0)}
          />
          <Tab
            className='w-1/3'
            label="成員" {...a11yProps(1)}
          />
          <Tab
            className='w-1/3'
            label="設定" {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        總覽內容
      </TabPanel>
      <TabPanel value={value} index={1}>
        成員內容
      </TabPanel>
      <TabPanel value={value} index={2}>
        設定內容
      </TabPanel>
    </Box>
  )
}
