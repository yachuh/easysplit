import axios from 'axios'
import { useForm } from 'react-hook-form'
import {
  EmailOutlined,
  CloseOutlined
} from '@mui/icons-material'

export default function ForgetPassword () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      AccountMail: ''
    }
  })
  const ForgetPwdOnSubmit = data => {
    console.log(data)

    const {
      AccountMail
    } = data

    axios
      .put('https://easysplit.rocket-coding.com/api/User/ForgetPassword',
        {
          AccountMail
        })
      .then(res => {
        console.log(res)
        console.log('忘記密碼傳送郵件成功')
      })
      .catch(err => {
        console.log(err)
        console.log('這個信箱還沒有註冊喔，請再確認看看！')
      })
  }

  return (
    <>
      <h4
        className='font-bold mb-4'>
        忘記密碼
      </h4>
      <p
        className='mb-4'>
        請輸入你註冊時的電子郵件信箱
      </p>
      <form
        className="w-full"
        onSubmit={handleSubmit(ForgetPwdOnSubmit)}>
        <div className="relative">
          <div
            className='inputImg'>
            <EmailOutlined sx={{ fontSize: 16 }} />
          </div>
          <input
            className="inputInfo mb-2"
            type="email"
            placeholder="請輸入Email"
            {...register('AccountMail',
              {
                required: {
                  value: true,
                  message: '請輸入資料內容!'
                },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '格式有誤!'
                }
              }
            )}
          />
          <p
            className="text-xs mb-2 text-rose-600">
            {errors.AccountMail?.message}
          </p>
        </div>
        <input
          className="btn-primary w-full mt-8"
          value="發送重設密碼信"
          type="submit" />
      </form>
    </>
  )
}
