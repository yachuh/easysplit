import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { loginApi } from '../utils/api'
import { getAuthToken, setAuthToken } from '../utils/utils'
import { useAuth } from '../context/context'
import Modal from '../components/Modal'
import ForgetPassword from '../components/ForgetPassword'
import {
  EmailOutlined,
  HttpsOutlined
} from '@mui/icons-material'
import googleIcon from '../image/googleIcon.svg'

export default function LoginForm () {
  const { token, setToken } = useAuth()
  console.log('old token', token)

  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      account: '',
      password: ''
    }
  })

  const navigate = useNavigate()

  const onSubmit = async data => {
    console.log('form data', data)

    try {
      const { status: isSuccess, message, jwtToken } = await loginApi(data)
      if (!isSuccess) {
        alert(message)
        return
      }
      console.log(message, jwtToken)
      setAuthToken(jwtToken)
      setToken(getAuthToken()) /* not working */
      console.log('token after setToken in Login.js', token) /* not working */
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className='viewContainer flex justify-center gap-16 mb-10 lg:mb-0'>
        <div className='hidden lg:block lg:group_beforeImg lg:mt-20' />
        <div
          className='formCard card-shadow'>
          <h3
            className="font-bold text-center mb-10">
            登入
          </h3>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <label
              className='labelTitle'
              htmlFor="account">
              電子郵件
            </label>
            <div className="relative">
              <div
                className='inputImg'>
                <EmailOutlined sx={{ fontSize: 16 }} />
              </div>
              <input
                id="account"
                className="inputInfo mb-2"
                type="email"
                placeholder="請輸入電子郵件"
                {...register('account', {
                  required: '此為必填欄位',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '電子郵件格式有誤，請重新確認'
                  }
                })}
              />
              <p className="text-xs mb-2 text-rose-600">{errors.account?.message}</p>
            </div>

            {/* 密碼 */}
            <label
              className='labelTitle mt-11'
              htmlFor="password">
              密碼
            </label>
            <div className="relative">
              <div
                className='inputImg'>
                <HttpsOutlined sx={{ fontSize: 16 }} />
              </div>

              <input
                id="password"
                className="inputInfo mb-2"
                type="password"
                placeholder="請輸入密碼"
                {...register('password', {
                  required: {
                    value: true,
                    message: '此為必填欄位'
                  },
                  minLength: {
                    value: 6,
                    message: '密碼長度至少6位字元'
                  }
                })}
              />
              <p className="text-xs mb-2 text-rose-600">{errors.password?.message}</p>
              <div>
                <p
                  onClick={() => setIsOpen(true)}
                  className='text-sm text-gray-500 block text-right mb-10 cursor-pointer'>
                  忘記密碼？
                </p>
                <Modal
                  open={isOpen}
                  onClose={() => setIsOpen(false)}>
                  <ForgetPassword />
                </Modal>
              </div>
            </div>

            {/* 確認 BTN */}
            <input
              className="btn-primary mb-5"
              type="submit"
              value="登入"
            />
          </form>
          <p
            className='flex before:line-bilateral after:line-bilateral mb-5'>
            <span className='text-gray-400 px-[20px]'>
              或
            </span>
          </p>

          <button
            className='btn-google btn-shadow w-full mb-12'>
            <img
              className='w-[20px]'
              src={googleIcon}
              alt='googleIcon'
            />
            <p
              className='text-sm'>
              使用 Google 帳號登入
            </p>
          </button>

          <div className='text-center text-xs'>
            <p>還沒有帳號嗎？
              <Link
                className="font-black"
                to="/signup">
                註冊
              </Link>
            </p>
          </div>
        </div>
        <div className='hidden lg:block lg:group_afterImg lg:mt-20' />
      </div>
    </>
  )
}
