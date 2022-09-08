import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../utils/api'
import {
  HttpsOutlined
} from '@mui/icons-material'

export default function ResetPwdForm () {
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
        <>
            <div className='viewContainer flex justify-center gap-16 mb-10 lg:mb-0'>
                <div className='hidden lg:block lg:group_beforeImg lg:mt-20' />
                <div
                    className='formCard card-shadow'>
                    <h3
                        className="font-bold text-center mb-10">
                        設定新密碼
                    </h3>
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}>

                        {/* 密碼 */}
                        <label
                            className='labelTitle'
                            htmlFor="password">
                            請設定新密碼
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
                                placeholder="請輸入 6 位以上英文數字符號"
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
                            <p
                                className="text-xs mb-2 text-rose-600">
                                {errors.password?.message}
                            </p>
                        </div>

                        {/* 密碼 */}
                        <label
                            className='labelTitle mt-11'
                            htmlFor="password">
                            請再次輸入新密碼
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
                                placeholder="請再次輸入新密碼"
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
                        </div>

                        {/* 確認 BTN */}
                        <input
                            className="btn-primary mt-14"
                            type="submit"
                            value="重設密碼"
                        />
                    </form>
                </div>
                <div className='hidden lg:block lg:group_afterImg lg:mt-20' />
            </div>
        </>
  )
}
