import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { CloseOutlined } from '@mui/icons-material'
import { sendReminderApi } from '../utils/api'
import mailSend from '../image/mailSend.svg'
import successIcon from '../image/successIcon.svg'
import deleteIcon from '../image/deleteIcon.svg'
import SettledDetail from '../components/settlement/SettledDetail'

// profile 頁點擊「重設密碼」：重設密碼信發送成功 modal
export const ModalResetPwd = ({ onClose, account }) => {
  return (
        <>
            <div className="flex flex-col items-center gap-4 mb-4">
                <img className="w-[45px]" src={mailSend} alt="mailSend" />
                <h4 className="font-bold">
                    重設密碼信已送出
                </h4>
                <p className='text-gray-500'>至 {account}</p>
                <p>請點擊信件中的連結以進行重設密碼</p>
                <p
                    className="text-xs text-gray-400 text-center">
                    找不到信件嗎？<br></br>請檢查「垃圾郵件」分類，或在信箱搜尋「EasySplit拆帳趣」
                </p>
            </div>
            <button onClick={onClose} className="btn-primary w-full">
                確定
            </button>
        </>
  )
}

// 重設密碼頁：重設密碼成功 modal
export const ModalPwdSuccess = ({ onClose }) => {
  return (
        <>
            <div className="flex flex-col items-center gap-4 mb-4">
                <img className="w-[45px]" src={successIcon} alt="successIcon" />
                <h4 className="font-bold">密碼修改成功</h4>
                <p>請前往登入頁重新登入</p>
            </div>
            <Link href="/login" clLinkssName="btn-primary w-full">
                前往登入
            </Link>
        </>

  )
}

// 重設密碼頁：重設密碼失敗 modal
export const ModalPwdfail = ({ onClose }) => {
  return (
        <>
            <div className="flex flex-col items-center gap-4 mb-4">
                <img className="w-[45px]" src={successIcon} alt="successIcon" />
                <h4 className="font-bold">密碼修改失敗</h4>
                <p>請再試一次</p>
            </div>
            <button onClick={onClose} className="btn-primary w-full">
                確定
            </button>
        </>

  )
}

export const ModalVerifySignup = ({ onClose }) => {
  return (
        <>
            <div
                className='flex flex-col items-center gap-4 mb-4'>
                <img
                    className='w-[45px]'
                    src={mailSend}
                    alt="mailSend"
                />
                <h4
                    className='font-bold'>
                    驗證信已送出
                </h4>
                <p
                    className='text-gray-500'>
                    至 o***t@mail.com
                </p>
                <p>
                    請點擊信件中的連結以驗證您的電子郵件
                </p>
                <p
                    className='text-xs text-gray-400 text-center'>
                    沒收到驗證信嗎？
                    <span className="cursor-pointer text-colors-primary border-b">再一次寄送驗證信件</span>
                </p>
            </div>
            <button
                onClick={onClose}
                className="btn-primary w-full">
                確定
            </button>
        </>
  )
}

export const DeletePayment = ({ onClose, onClick }) => {
  return (
        <>
            <div
                className='flex flex-col items-center gap-4 mb-4'>
                <img
                    className='w-[45px]'
                    src={deleteIcon}
                    alt="deleteIcon"
                />
                <h4
                    className='font-bold'>
                    確定刪除 收款資料 項目
                </h4>
            </div>
            <div className='w-full flex justify-between gap-4'>
                <button
                    onClick={onClose}
                    className="btn-outline-red w-full">
                    取消
                </button>
                <button
                    onClick={onClick}
                    className="btn-red w-full">
                    確定刪除
                </button>
            </div>
        </>
  )
}

export const ModalSettlementSuccess = ({ onClose, getSettledDetail }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
        <>
            <div className="flex flex-col items-center gap-4 mb-4">
                <img className="w-[45px]" src={successIcon} alt="successIcon" />
                <h4 className="font-bold">太棒了！</h4>
                <p className='text-center'>恭喜你結算成功，<br />對方也會收到你的結算通知！</p>
            </div>
            <button onClick={handleOpen} className="btn-primary w-full">
                查看紀錄
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                className="modalCard-bg">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="modalCard">
                    <div
                        onClick={handleClose}
                        className="modalCancel">
                        <CloseOutlined sx={{ fontSize: 14 }} />
                    </div>
                    <SettledDetail
                        open={open}
                        onClose={handleClose}
                    // getSettledDetail={getSettledDetail}
                    />
                </div>
            </Modal>
        </>

  )
}

export const ModalConfirmTheDeletion = ({ onClose, deleteSettlemetClick }) => {
  return (
        <>
            <div className="flex flex-col gap-4 mb-4 w-full text-center">
                <h4 className="w-full font-bold pb-2 border-b border-gray-300">刪除結算紀錄</h4>
                <p className="w-full text-xl font-bold">確定要將此筆結算紀錄刪除？</p>
                <p className='w-full text-gray-600'>請注意：此動作一經確認無法復原。您將無法恢復該筆紀錄。</p>
            </div>
            <div className='w-full flex justify-between gap-4'>
                <button
                    onClick={onClose}
                    className="btn-outline w-full">
                    取消
                </button>
                <button
                    onClick={deleteSettlemetClick}
                    className="btn-primary w-full">
                    確定
                </button>
            </div>
        </>

  )
}

export const ModalReminder = ({ onClose, pickReminder, reminderdData }) => {
  const { ownerMemberId, payerMemberId } = pickReminder
  const { settlementReminder } = reminderdData
  const [dataPick, setDataPick] = useState(
    {
      ownerMemberId: null,
      owenerName: '',
      ownAmountresult: null,
      payerMemberId: null,
      payerName: '',
      status: ''
    }
  )

  const [sendReminderData, setSendReminderData] = useState(
    {
      OwnerId: dataPick[0]?.ownerMemberId,
      PayerId: dataPick[0]?.payerMemberId
    }
  )

  const reminder = () => {
    const filterReminder = settlementReminder.filter(item => {
      return (ownerMemberId === item.ownerMemberId && payerMemberId === item.payerMemberId)
    })
    setDataPick(filterReminder)
    setSendReminderData(sendReminderData => ({
      ...sendReminderData,
      OwnerId: ownerMemberId,
      PayerId: payerMemberId
    }))
  }

  const sendReminder = async () => {
    try {
      const { status: isSuccess, message, OwnerId, PayerId } = await sendReminderApi(sendReminderData)
      if (!isSuccess) {
        return
      }
      console.log(message)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    reminder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerMemberId, payerMemberId, settlementReminder])

  const clickSendReminder = () => {
    sendReminder(sendReminderData)
    onClose()
  }

  return (
        <>
            <div className="flex flex-col gap-4 mb-4 w-full text-center">
                <h4 className="w-full font-bold pb-2 border-b border-gray-300">發送提醒</h4>
                <p className="w-full text-xl">提醒<span className='font-bold mx-2'>{dataPick[0]?.owenerName}</span>還款給<span className='font-bold mx-2'>{dataPick[0]?.payerName}</span></p>
                <p className='w-full text-gray-600'>{dataPick[0]?.status}</p>
            </div>
            <div className='w-full flex justify-between gap-4'>
                <button
                    onClick={onClose}
                    className="btn-outline w-full">
                    取消
                </button>
                <button
                    onClick={clickSendReminder}
                    className="btn-primary w-full">
                    確定
                </button>
            </div>
        </>

  )
}
