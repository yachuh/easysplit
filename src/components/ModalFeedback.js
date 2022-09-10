import React from 'react'
import mailSend from '../image/mailSend.svg'
import successIcon from '../image/successIcon.svg'

export const ModalResetPwd = ({ onClose }) => {
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
                    至 o***t@mail.com
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
