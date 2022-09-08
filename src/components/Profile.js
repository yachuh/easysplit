import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { editProfileApi, getProfileApi } from '../utils/api'
import { useAuth } from '../context/context'
import { getAuthToken } from '../utils/utils'

export const Profile = () => {
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
        <div>
            <h2 className="text-2xl mb-3">會員資料</h2>
            <form
                className="flex flex-col w-1/3"
                onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor="name">
                    Name
                </label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="text"
                    value= {userData.name}
                    {...register('name', {
                      required: {
                        value: true,
                        message: '請輸入您的姓名!'
                      }
                    })} />
                <p
                    className="text-xs mb-2 text-rose-600">
                    {errors.name?.message}
                </p>
                <label
                    htmlFor="account">
                    Email
                </label>
                <input
                    disabled="disabled"
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="email"
                    value={userData.email}
                />
                <input
                    className="p-2 border border-slate-700 rounded-sm w-1/3"
                    value="儲存"
                    type="submit" />
            </form>
        </div>
  )
}
