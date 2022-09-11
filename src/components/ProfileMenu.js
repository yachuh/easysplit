import React, { useState } from 'react'
import { UserMenu } from '../components/UserMenu'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import {
  LogoutOutlined
} from '@mui/icons-material'

export default function ProfileMenu () {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <UserMenu />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={handleClose}>
          會員中心
        </MenuItem>
        <MenuItem
          onClick={handleClose}>
          <ListItemIcon>
            <LogoutOutlined sx={{ fontSize: 24 }} />
          </ListItemIcon>
          會員登出
        </MenuItem>
      </Menu>
    </>
  )
}
