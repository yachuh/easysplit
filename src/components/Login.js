import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { loginApi } from '../utils/api'

export const Login = () => {
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
      const { status: isSuccess, message } = await loginApi(data)
      if (!isSuccess) {
        alert(message)
        return
      }

      console.log(message)
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  return (
        <div>
            <h2 className="text-2xl mb-3">登入</h2>
            <form className="flex flex-col w-1/3" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <label htmlFor="account">電子郵件</label>
                <input
                    id="account"
                    className="mb-3 border border-slate-700 rounded-sm"
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
                {/* 密碼 */}
                <label htmlFor="password">密碼</label>

                <input
                    id="password"
                    className="mb-3 border border-slate-700 rounded-sm"
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
                {/* 確認 BTN */}
                <input
                    className="p-2 border border-slate-700 rounded-sm w-1/3"
                    type="submit"
                    value="登入"
                />
            </form>
            <div className='mt-2'>
                <p>還沒有帳號嗎？<Link className="text-teal-600" to="/signup">註冊會員</Link></p>
            </div>
        </div>
  )
}
