import axios from 'axios'
import { useForm } from 'react-hook-form'

export const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      AccountMail: ''
    }
  })
  const onSubmit = data => {
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
        <div>
            <h2 className="text-2xl mb-3">忘記密碼</h2>
            <p>請輸入你註冊時的電子郵件信箱</p>
            <form
                className="flex flex-col w-1/3"
                onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor="AccountMail">
                    請輸入Email
                </label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="email"
                    placeholder="email"
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

                <input
                    className="p-2 border border-slate-700 rounded-sm"
                    value="發送重設密碼信"
                    type="submit" />
            </form>
        </div>
  )
}
