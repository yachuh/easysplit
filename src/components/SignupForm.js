import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { signupApi } from '../utils/api'
import { EmailOutlined, HttpsOutlined, PermIdentityOutlined } from '@mui/icons-material'
import googleIcon from '../image/googleIcon.svg'

export default function SignupForm () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      account: '',
      password: ''
    }
  })

  const onSubmit = async data => {
    console.log('Signup form data', data)

    try {
      const { status: isSuccess, message } = await signupApi(data)
      if (!isSuccess) {
        alert(message)
        return
      }
      alert(message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className='viewContainer flex justify-center gap-16 md:mb-10'>
            <div className='hidden lg:block lg:group_beforeImg lg:mt-20' />
            <div className='formCard card-shadow'>
                <h3 className="font-bold text-center mb-10">註冊</h3>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    {/* 使用者名稱 */}
                    <label className="labelTitle" htmlFor="name">使用者暱稱</label>
                    <div className="relative">
                        <div className='inputImg'><PermIdentityOutlined sx={{ fontSize: 16 }} /></div>
                        <input
                            id="name"
                            className="inputInfo mb-2"
                            type="text"
                            placeholder="站內顯示的暱稱，未來可隨時修改"
                            {...register('name', { required: '此為必填欄位' })}
                        />
                        <p className="text-xs mb-2 text-rose-600">{errors.name?.message}</p>
                    </div>
                    {/* Email */}
                    <label className="labelTitle mt-11" htmlFor="account">電子郵件</label>
                    <div className="relative">
                        <div className="inputImg"><EmailOutlined sx={{ fontSize: 16 }} /></div>
                        <input
                            id="account"
                            className="inputInfo mb-2"
                            type="email"
                            placeholder="請輸入常用電子郵件"
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
                    <label className="labelTitle mt-11" htmlFor="password">密碼</label>
                    <div className="relative">
                        <div className='inputImg'><HttpsOutlined sx={{ fontSize: 16 }} /></div>
                        <input
                            id="password"
                            className="inputInfo mb-2"
                            type="password"
                            placeholder="需包含 6 位以上英文、數字或符號"
                            {...register('password', {
                              required: {
                                value: true,
                                message: '此為必填欄位'
                              },
                              minLength: {
                                value: 6,
                                message: '密碼需包含 6 位以上英文、數字或符號'
                              }
                            })}
                        />
                        <p className="text-xs mb-2 text-rose-600">{errors.password?.message}</p>
                    </div>
                    {/* 確認 BTN */}
                    <input className="btn-primary mb-5 mt-14" type="submit" value="註冊"/>
                </form>
                <p className="flex before:line-bilateral after:line-bilateral mb-5">
                    <span className="text-gray-400 px-[20px]">或</span>
                </p>
                <button className="btn-google btn-shadow w-full mb-12">
                    <img className="w-[20px]" src={googleIcon} alt="googleIcon"/>
                    <p className="text-sm">使用 Google 帳號註冊</p>
                </button>
                <div className="text-center text-xs">
                    <p>已經有帳號嗎？<Link className="font-black" to="/login">登入</Link></p>
                </div>
            </div>
            <div className="hidden lg:block lg:group_afterImg lg:mt-20" />
        </div>
  )
}
