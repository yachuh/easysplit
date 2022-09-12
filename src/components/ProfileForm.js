import { useForm } from 'react-hook-form'
import { editProfileApi } from '../utils/api'
import { useUserData } from '../context/context'
import { EmailOutlined, PermIdentityOutlined } from '@mui/icons-material'

export default function ProfileForm ({ onSubmitSaveProfile }) {
  const { userData, setUserData } = useUserData()
  const { account, name } = userData

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name
    }
  })

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
      setUserData(userData => ({
        ...userData,
        name: data.name
      }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <form
            className="flex flex-col mb-10 mt-11 lg:w-1/2 lg:mx-auto lg:mt-16 2xl:w-2/5"
            onSubmit={handleSubmit(onSubmit)}>
            {/* 姓名 */}
            <label className="labelTitle" htmlFor="name">姓名</label>
            <div className="relative">
                <div className="inputImg">
                    <PermIdentityOutlined sx={{ fontSize: 16 }} />
                </div>
                <input
                    id="name"
                    className="inputInfo mb-2"
                    type="text"
                    placeholder="站內顯示的暱稱，可隨時修改"
                    // value={name}
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
                <div className="inputImg">
                    <EmailOutlined sx={{ fontSize: 16 }} />
                </div>
                <input
                    id="account"
                    className="inputInfo mb-2"
                    type="email"
                    value={account}
                    disabled="disabled"
                />
            </div>
            {/* BTNs */}
            <div className='mt-10 flex justify-between items-center gap-[5%]'>
                <div className="btn-primary w-1/2 text-center">更改密碼</div>
                <input
                    className="btn-primary w-1/2"
                    type="submit"
                    value="儲存"
                />
            </div>
        </form>
  )
}
