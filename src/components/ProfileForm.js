import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { editProfileApi, getProfileApi } from '../utils/api'
import { useAuth } from '../context/context'
import { getAuthToken } from '../utils/utils'
import {
  EmailOutlined,
  PermIdentityOutlined
}
  from '@mui/icons-material'

export default function ProfileForm () {
  const { token, setToken } = useAuth()
  const [userData, setUserData] = useState({
    name: '',
    account: '',
    imageUrl: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      account: ''
    }
  })

  setToken(getAuthToken())
  console.log('new token', token)

  const getUserProfile = async () => {
    try {
      const res = await getProfileApi(token)
      console.log('res', res)
      if (!res.status) {
        console.log(res.message)
        return
      }
      setUserData({
        name: res.userstatus.name,
        account: res.userdata.Account
      })
    } catch (error) {
      console.log(error)
    }
  }
  getUserProfile()

  const onSubmit = async data => {
    console.log('form data', data)
    try {
      const { status: isSuccess, message } = await editProfileApi(userData.name)
      if (!isSuccess) {
        alert(message)
        return
      }
      console.log(message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <form
            className="flex flex-col mb-10 mt-11 lg:w-1/2 lg:mx-auto lg:mt-16 2xl:w-2/5"
            onSubmit={handleSubmit(onSubmit)}>

            {/* 姓名 */}
            <label
                className='labelTitle'
                htmlFor="name">
                姓名
            </label>
            <div className="relative">
                <div
                    className='inputImg'>
                    <PermIdentityOutlined sx={{ fontSize: 16 }} />
                </div>
                <input
                    id='name'
                    className="inputInfo mb-2"
                    type="text"
                    placeholder="請輸入更改姓名"
                    value={userData.name}
                    {...register('name', {
                      required: {
                        value: true,
                        message: '請輸入您的姓名!'
                      }
                    })}
                />
                {/* <p className="text-xs mb-2 text-rose-600">
                        {errors.name?.message}
                    </p> */}
            </div>

            {/* Email */}
            <label
                className='labelTitle mt-10'
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
                    value="o***t@mail.com"
                    {...register('account', {
                      required: '此為必填欄位',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: '電子郵件格式有誤，請重新確認'
                      }
                    })}
                />
            </div>

            {/* 確認 BTN */}
            <div className='mt-10 flex justify-between items-center gap-[5%]'>
                <div
                    className="btn-primary w-1/2 text-center">
                    更改密碼
                </div>
                <input
                    className="btn-primary w-1/2"
                    type="submit"
                    value="儲存"
                />
            </div>
        </form>
  )
}
