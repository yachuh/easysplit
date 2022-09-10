import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProfileForm from './ProfileForm'

function TabPanel (props) {
  const { children, value, index, ...other } = props

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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function ProfileTab () {
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
                        className='w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5'
                        label="會員資料設定" {...a11yProps(0)}
                    />
                    <Tab
                        className='w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5'
                        label="收付款項設定" {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProfileForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                收付款項設定
            </TabPanel>
        </Box>
  )
}
