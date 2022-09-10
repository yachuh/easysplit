import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { editProfileApi, getProfileApi } from '../utils/api'
// import userImg from '../image/userImg.svg'
import { BorderColorOutlined, EmailOutlined, PermIdentityOutlined } from '@mui/icons-material'

export default function Profile () {
  const [userData, setUserData] = useState({
    name: '',
    account: '',
    image: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: userData.name
    }
  })

  const getUserProfile = async () => {
    try {
      const { status: isSuccess, message, userdata } = await getProfileApi()
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
      reset({
        name: userData.name
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [userData])

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
    <div className="viewContainer md:flex md:flex-col">
            <div className="flex flex-col items-center mb-5 md:mb-20 md:self-start">
                <div className="flex items-end gap-3 mb-5">
                    <img className="rounded-full border card-shadow" src={userData.image} alt="userImg"/>
                    <div className="text-gray-400"><BorderColorOutlined /></div>
                </div>
                <p className="font-black">{userData.name}</p>
            </div>
            <div className="md:flex md:justify-between">
                {/* tab START */}
                <div className="flex justify-between items-center gap-[5%] mb-[50px] md:flex-col md:justify-start md:gap-0">
                    <div className="w-1/2 md:w-full md:pl-6 md:border-l-2 md:py-5 md:border-gray-300 md:hover:sideEdge-hover md:relative">
                        <button className="btn-primary w-full md:before:sideEdge-circle">會員資料設定</button>
                    </div>
                    <div className="w-1/2 md:w-full md:pl-6 md:border-l-2 md:py-5 md:border-gray-300 md:hover:sideEdge-hover md:relative">
                        <button className="btn-primary w-full md:before:sideEdge-circle">收付款項設定</button>
                    </div>
                </div>
                {/* tab END */}
                {/* profile form START */}
                <form className="flex flex-col mb-10 md:w-2/5 md:mr-[10%]" onSubmit={handleSubmit(onSubmit)}>
                    {/* 姓名 */}
                    <label className="labelTitle" htmlFor="name">姓名</label>
                    <div className="relative">
                        <div className="inputImg"><PermIdentityOutlined sx={{ fontSize: 16 }} /></div>
                        <input
                            id="name"
                            className="inputInfo mb-2"
                            type="text"
                            placeholder="請輸入你的暱稱"
                            {...register('name', {
                              required: {
                                value: true,
                                message: '此欄不可留空'
                              }
                            })}
                        />
                        <p className="text-xs mb-2 text-rose-600">{errors.name?.message}</p>
                    </div>
                    {/* Email */}
                    <label className="labelTitle mt-10" htmlFor="account">電子郵件</label>
                    <div className="relative">
                        <div className='inputImg'><EmailOutlined sx={{ fontSize: 16 }} /></div>
                        <input
                            id="account"
                            className="inputInfo mb-2"
                            type="email"
                            disabled="disabled"
                            value={userData.account}
                        />
                    </div>
                    {/* BTNs */}
                    <div className='mt-10 flex justify-between items-center gap-[5%]'>
                        <div className="btn-primary w-1/2 text-center">更改密碼</div>
                        <input className="btn-primary w-1/2" type="submit" value="儲存"/>
                    </div>
                </form>
                {/* profile form END */}
            </div>
    </div>
  )
}
