import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { setAuthToken } from '../../utils/utils'
import { loginApi } from '../../utils/api'
import Modal from '@mui/material/Modal'
import ForgetPassword from './ForgetPassword'
import { EmailOutlined, HttpsOutlined, CloseOutlined } from '@mui/icons-material'
import googleIcon from '../../image/googleIcon.svg'

export default function LoginForm () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className='viewContainer flex justify-center gap-16 mb-10 lg:mb-0'>
        <div className='hidden lg:block lg:group_beforeImg lg:mt-20' />
        <div className='formCard card-shadow'>
          <h3 className="font-bold text-center mb-10">登入</h3>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <label className='labelTitle' htmlFor="account">電子郵件</label>
            <div className="relative">
              <div
                className='inputImg'>
                <EmailOutlined sx={{ fontSize: 16 }} />
              </div>
              <input
                id="account"
                className="inputInfo mb-2"
                type="email"
                placeholder="請輸入你的會員電子郵件"
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
            <label className='labelTitle mt-11' htmlFor="password">密碼</label>
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
                <p onClick={handleOpen} className="text-sm text-gray-500 block text-right mb-10 cursor-pointer">忘記密碼？</p>
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
                  <ForgetPassword
                    open={open}
                    onClose={handleClose} />
                </div>
              </Modal>
              {/* <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}>
                <ForgetPassword
                  open={isOpen}
                  onClose={() => setIsOpen(false)} />
              </Modal> */}
              </div>
            </div>
            {/* 確認 BTN */}
            <input className="btn-primary mb-5" type="submit" value="登入"/>
          </form>
          <p className='flex before:line-bilateral after:line-bilateral mb-5'><span className='text-gray-400 px-[20px]'>或</span></p>
          <button className='btn-google btn-shadow w-full mb-12'>
            <img className='w-[20px]' src={googleIcon} alt='googleIcon'/>
            <p className='text-sm'>使用 Google 帳號登入</p>
          </button>
          <div className='text-center text-xs'>
            <p>還沒有帳號嗎？<Link className="font-black" to="/signup">註冊</Link></p>
          </div>
      </div>
      <div className="hidden lg:block lg:group_afterImg lg:mt-20" />
    </div>
  )
}
