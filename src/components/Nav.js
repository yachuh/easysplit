import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { ModalResetPwd, ModalPwdSuccess, ModalVerifySignup } from '../components/ModalFeedback'
import {
  CloseOutlined
} from '@mui/icons-material'

const Nav = () => {
  // const [isOpen, setIsOpen] = useState(false)

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const handleOpen3 = () => setOpen3(true)
  const handleClose3 = () => setOpen3(false)

  return (
        <nav className="mt-5 mb-5 flex items-center gap-x-4 list-none underline ">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/forgetpassword">忘記密碼</Link>
            </li>
            <li>
                <Link to="/profile">會員資料</Link>
            </li>
            <li>
                <div className="cursor-pointer" onClick={handleOpen}>重設密碼信已送出</div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    className='modalCard-bg'
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='modalCard'>
                        <div
                            onClick={handleClose}
                            className="modalCancel">
                            <CloseOutlined sx={{ fontSize: 14 }} />
                        </div>
                        <ModalResetPwd
                            open={open}
                            onClose={handleClose} />
                    </div>
                </Modal>
            </li>

            <li>
                <div className="cursor-pointer" onClick={handleOpen2}>密碼修改成功</div>
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    className='modalCard-bg'
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='modalCard'>
                        <div
                            onClick={handleClose2}
                            className="modalCancel">
                            <CloseOutlined sx={{ fontSize: 14 }} />
                        </div>
                        <ModalPwdSuccess
                            open={open}
                            onClose={handleClose2} />
                    </div>
                </Modal>
            </li>

            <li>
                <div className="cursor-pointer" onClick={handleOpen3}>驗證信已送出</div>
                <Modal
                    open={open3}
                    onClose={handleClose3}
                    className='modalCard-bg'
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='modalCard'>
                        <div
                            onClick={handleClose3}
                            className="modalCancel">
                            <CloseOutlined sx={{ fontSize: 14 }} />
                        </div>
                        <ModalVerifySignup
                            open={open}
                            onClose={handleClose3} />
                    </div>
                </Modal>
            </li>

        </nav>
  )
}

export default Nav
