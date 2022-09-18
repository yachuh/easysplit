import React from 'react'
import { useForm } from 'react-hook-form'
import { addBankApi } from '../../utils/api'
import { CreditCard } from '@mui/icons-material'

export default function AddPaymentBank ({ onClose, getPaymentAll }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      bank: '',
      accountname: '',
      bankcode: '',
      account: ''
    }
  })
  const onSubmit = async data => {
    console.log(data)

    try {
      const { status: isSuccess, message, jwtToken } = await addBankApi(data)
      if (!isSuccess) {
        alert(message)
        return
      }
      onClose()
      getPaymentAll()
    } catch (error) {
      console.log(error)
    }
  }

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
              htmlFor="accountname">
              帳戶名稱 ( 姓名 )
            </label>
            <input
              id='accountname'
              className="inputInfo pl-2 mb-1"
              type="text"
              placeholder="請輸入姓名"
              {...register('accountname',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.accountname?.message}</p>

            <label
              className='labelTitle mt-7 mb-1'
              htmlFor="bankcode">
              銀行代碼
            </label>
            <input
              id='bankcode'
              className="inputInfo pl-2 mb-1"
              type="text"
              placeholder="請輸入銀行代碼"
              {...register('bankcode',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.bankcode?.message}</p>
          </div>

          <div className='mb-8 md:w-full md:mb-0'>
            <label
              className='labelTitle mb-1'
              htmlFor="bankname">
              銀行名稱
            </label>
            <input
              id='bankname'
              className="inputInfo pl-2 mb-1"
              type="text"
              placeholder="請輸入銀行名稱"
              {...register('bank',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.bank?.message}</p>

            <label
              className='labelTitle mt-7 mb-1'
              htmlFor="account">
              銀行帳號
            </label>
            <input
              id='account'
              className="inputInfo pl-2 mb-1"
              type="text"
              placeholder="請輸入銀行帳號"
              {...register('account',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.account?.message}</p>
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
              value='新增'
            />
          </div>
        </div>
      </form>
    </>
  )
}
