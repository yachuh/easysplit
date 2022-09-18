import React from 'react'
import mailSend from '../image/mailSend.svg'
import successIcon from '../image/successIcon.svg'
import deleteIcon from '../image/deleteIcon.svg'

export const ModalResetPwd = ({ onClose, account }) => {
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
                    重設密碼信已送出
                </h4>
                <p
                    className='text-gray-500'>
                    至 {account}
                </p>
                <p>
                    請點擊信件中的連結以進行重設密碼
                </p>
                <p
                    className='text-xs text-gray-400 text-center'>
                    找不到信件嗎？請檢查「垃圾郵件」分類或在信箱搜尋「拆帳趣」
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

export const ModalPwdSuccess = ({ onClose }) => {
  return (
        <>
            <div
                className='flex flex-col items-center gap-4 mb-4'>
                <img
                    className='w-[45px]'
                    src={successIcon}
                    alt="successIcon"
                />
                <h4
                    className='font-bold'>
                    密碼修改成功
                </h4>
                <p>
                    即將跳轉至登入頁
                </p>
            </div>
            <button
                onClick={onClose}
                className="btn-primary w-full">
                前往登入
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
