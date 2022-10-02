import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { addBankApi } from '../../utils/api'
import { CreditCard } from '@mui/icons-material'
import LoadingModal from '../../components/LoadingModal'

export default function AddPaymentBank ({ onClose, getPaymentAll }) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      Bank: '',
      AccountName: '',
      BankCode: '',
      Account: ''
    }
  })
  const onSubmit = async data => {
    // console.log(data)
    setIsLoading(true)
    try {
      const { status: isSuccess, message, jwtToken } = await addBankApi(data)
      if (!isSuccess) {
        return
      }
      getPaymentAll()
      onClose()
      setIsLoading(false)
      toast.success('成功新增 銀行轉帳(台灣) 收款資料!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <>
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
                    htmlFor="AccountName">
                    帳戶名稱 ( 姓名 )
                  </label>
                  <input
                    id='AccountName'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入姓名"
                    {...register('AccountName',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.AccountName?.message}</p>

                  <label
                    className='labelTitle mt-7 mb-1'
                    htmlFor="BankCode">
                    銀行代碼
                  </label>
                  <input
                    id='BankCode'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入銀行代碼"
                    {...register('BankCode',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.BankCode?.message}</p>
                </div>

                <div className='mb-8 md:w-full md:mb-0'>
                  <label
                    className='labelTitle mb-1'
                    htmlFor="Bank">
                    銀行名稱
                  </label>
                  <input
                    id='Bank'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入銀行名稱"
                    {...register('Bank',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.Bank?.message}</p>

                  <label
                    className='labelTitle mt-7 mb-1'
                    htmlFor="Account">
                    銀行帳號
                  </label>
                  <input
                    id='Account'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入銀行帳號"
                    {...register('Account',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.Account?.message}</p>
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
      }
    </>

  )
}
