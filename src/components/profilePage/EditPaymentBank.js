import React from 'react'
import { useForm } from 'react-hook-form'
import { CreditCard } from '@mui/icons-material'

export default function EditPaymentBank ({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      account: '',
      text: ''
    }
  })
  const onSubmit = data => console.log(data)
  console.log(errors)

  return (
    <>
      <div className="modalCard-payTitle bg-colors-primary text-white">
        <CreditCard sx={{ fontSize: 30 }} />
        <p>銀行轉帳（台灣）</p>
      </div>
      <form
        className="modalCard-payForm"
        onSubmit={handleSubmit(onSubmit)}>

        <div className='mb-11 ProfilePaymentModal-wrap'>
          <div className='mb-8 md:w-full md:mb-0'>
            <label
              className='labelTitle mb-1'
              htmlFor="account">
              姓名
            </label>
            <input
              id='name'
              className="inputInfo pl-2 mb-1"
              type="text"
              placeholder="請輸入姓名"
              {...register('name',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.name?.message}</p>

            <label
              className='labelTitle mt-7 mb-1'
              htmlFor="account">
              電話
            </label>
            <input
              id='tel'
              className="inputInfo pl-2 mb-1"
              type="tel"
              placeholder="請輸入電話"
              {...register('tel',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.tel?.message}</p>
          </div>

          <div className='mb-8 md:w-full md:mb-0'>
            <label
              className='labelTitle mb-1'
              htmlFor="bankname">
              銀行名稱
            </label>
            <input
              id='name'
              className="inputInfo pl-2 mb-1"
              type="text"
              placeholder="請輸入銀行名稱"
              {...register('bankname',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.bankname?.message}</p>

            <label
              className='labelTitle mt-7 mb-1'
              htmlFor="bankaccount">
              銀行帳號
            </label>
            <input
              id='tel'
              className="inputInfo pl-2 mb-1"
              type="tel"
              placeholder="請輸入銀行帳號"
              {...register('bankaccount',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.bankaccount?.message}</p>
          </div>

        </div>

        <div className='ProfilePaymentModal-wrap'>
          <div className='hidden md:block md:w-full' />
          <div className='md:flex md:justify-between md:w-full md:gap-4'>
            <input
              onClick={onClose}
              type="button"
              className='btn-outline mb-4 w-full cursor-pointer md:mb-0'
              value='取消'
            />
            <input
              className='btn-primary w-full cursor-pointer'
              type="submit"
              value='儲存'
            />
          </div>
        </div>
      </form>
    </>
  )
}
