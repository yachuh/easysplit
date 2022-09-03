import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { signupApi } from '../utils/api'

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      Name: '',
      Account: '',
      Password: ''
    }
  })

  const onSubmit = async data => {
    console.log('form data', data)

    try {
      const res = await signupApi(data)
      const { Status: status, Message: message } = res.data
      console.log(data)
      if (!status) { // 註冊失敗
        alert(message)
      } else { // 註冊成功
        alert(message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
        <div>
            <h2 className="text-2xl mb-3">註冊</h2>
            <form className="flex flex-col w-1/3" onSubmit={handleSubmit(onSubmit)}>
                {/* 名稱 */}
                <label
                    htmlFor="Name">
                    名稱
                </label>
                <input
                    id='Name'
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="text"
                    placeholder="站內顯示的暱稱，未來可隨時更改"
                    {...register('name', { required: '此為必填欄位' })}
                />
                <p className="text-xs mb-2 text-rose-600">{errors.Name?.message}</p>
                {/* Email */}
                <label
                    htmlFor="Account">
                    電子郵件帳號
                </label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
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
                <p className="text-xs mb-2 text-rose-600">{errors.Account?.message}</p>
                {/* 密碼 */}
                <label
                    htmlFor="Password">
                    密碼
                </label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="password"
                    placeholder="需包含 6 位以上英文數字符號"
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
                <p className="text-xs mb-2 text-rose-600">{errors.Password?.message}</p>
                {/* 確認 BTN */}
                <input
                    className="p-2 border border-slate-700 rounded-sm w-1/3"
                    type="submit"
                    value="註冊"
                />
            </form>
            <div className='mt-2'>
                <p>已經有帳號了？<Link className="text-teal-600" to="/login">登入會員</Link></p>
            </div>
        </div>
  )
}
