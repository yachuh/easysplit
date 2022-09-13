import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {
  EmailOutlined
} from '@mui/icons-material'
// import Modal from '../components/Modal'
// import { ModalFeedback } from '../components/ModalFeedback.js'

export default function ForgetPassword ({ Open, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      AccountMail: ''
    }
  })

  const onSubmit = async data => {
    console.log(data)

    const {
      AccountMail
    } = data

    try {
      const res = await axios.post('https://easysplit.rocket-coding.com/api/User/ForgetPassword',
        {
          AccountMail
        })
      console.log(res)
      console.log(res.data.Status)
      console.log('忘記密碼傳送郵件成功')
      if (res.status === 200 && res.data.Status === true) {
        onClose()
      }
      // if (res.status === 200 && res.data.Status === false) {
      //   Open()
      // }
    } catch (err) {
      console.log(err)
      console.log('這個信箱還沒有註冊喔，請再確認看看！')
    }
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
        className="w-full relative"
        onSubmit={handleSubmit(onSubmit)}>
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
        <input
          className="btn-primary w-full mt-8"
          value="發送重設密碼信"
          type="submit" />
      </form>
    </>
  )
}
