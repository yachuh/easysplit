import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Add, LocalAtm, CreditCard } from '@mui/icons-material'
import ProfilePaymentList from './ProfilePaymentList'

export default function ProfilePayment (props) {
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
        className='btn-addPayment'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Add sx={{ fontSize: 20 }} />
        創建收款方式
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        // PaperProps={{
        //   style: {
        //     width: '100%',
        //     left: 0,
        //     right: 0
        //   }
        // }}
      >
        <MenuItem
          onClick={handleClose}
          >
          <ListItemIcon>
            <LocalAtm sx={{ fontSize: 24 }} />
          </ListItemIcon>
          現金面交
        </MenuItem>
        <MenuItem
          onClick={handleClose}>
          <ListItemIcon>
            <CreditCard sx={{ fontSize: 24 }} />
          </ListItemIcon>
          銀行轉帳（台灣）
        </MenuItem>
        <MenuItem
          onClick={handleClose}>
          <ListItemIcon>
            {/* <LogoutOutlined sx={{ fontSize: 24 }} /> */}
          </ListItemIcon>
          LINE PAY
        </MenuItem>
      </Menu>

      <ProfilePaymentList />
    </>
  )
}
