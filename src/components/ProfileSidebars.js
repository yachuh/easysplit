import React, { useState } from 'react'
import ProfileUser from './ProfileUser'
import ProfileTab from './ProfileTab'
import ProfileSideGroup from './ProfileSideGroup.js'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {
  Home,
  Person,
  Notifications
}
  from '@mui/icons-material'

const primary = '#40798C'
const secondary = '#6AC1AC'
const third = '#F0CC67'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

export default function ProfileSidebars () {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      className='w-full'
      sx={{ flexGrow: 1, display: 'flex' }}
    >
      <Tabs
        className='w-2/5 py-14 mr-8 lg:w-[30%] lg:mr-10 xl:w-1/4'
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab
          sx={{ fontSize: 24 }}
          icon={<Home sx={{ fontSize: 24, color: primary }} />}
          iconPosition="start"
          label="首頁" {...a11yProps(0)} >
        </Tab>
        <Tab
          sx={{ fontSize: 24 }}
          icon={<Person sx={{ fontSize: 24, color: secondary }} />}
          iconPosition="start"
          label="會員" {...a11yProps(1)} />
        <Tab
          sx={{ fontSize: 24 }}
          icon={<Notifications sx={{ fontSize: 24, color: third }} />}
          iconPosition="start"
          label="通知" {...a11yProps(2)} />
        <ProfileSideGroup />
      </Tabs>

      <TabPanel
        className="w-full"
        value={value} index={0}>
        首頁
      </TabPanel>
      <TabPanel
        className="w-full"
        value={value} index={1}>
        <ProfileUser />
        <ProfileTab />
      </TabPanel>
      <TabPanel
        className="w-full"
        value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  )
}
