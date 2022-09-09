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
    image: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: userData.name
    }
  })

  /* Get token from localStorage */
  setToken(getAuthToken())
  console.log('new token', token)

  const getUserProfile = async () => {
    try {
      const { status: isSuccess, message, userdata } = await getProfileApi(token)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setUserData(userData => ({
        ...userData,
        name: userdata.Name,
        account: userdata.Account,
        image: userdata.Image
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [token])

  /* Update profile */
  const onSubmit = async data => {
    console.log('form data', data)
    try {
      const { status: isSuccess, message } = await editProfileApi(data.name)
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
                <label htmlFor="name">Name</label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="text"
                    placeholder="請輸入你的暱稱"
                    {...register('name', {
                      required: {
                        value: true,
                        message: '此為必填欄位'
                      }
                    })} />
                <p className="text-xs mb-2 text-rose-600">{errors.name?.message}</p>
                <label htmlFor="account">Email</label>
                <input
                    disabled="disabled"
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="email"
                    value={userData.account}
                />
                <input
                    className="p-2 border border-slate-700 rounded-sm w-1/3"
                    value="儲存"
                    type="submit" />
            </form>
        </div>
  )
}
