import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { addCashApi } from '../../utils/api'
import { LocalAtm } from '@mui/icons-material'
import LoadingModal from '../LoadingModal'

export default function AddPaymentCash ({ onClose, getPaymentAll }) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      Name: '',
      Phone: '',
      Method: ''
    }
  })
  const onSubmit = async data => {
    // console.log(data)
    setIsLoading(true)
    try {
      const { status: isSuccess, message, jwtToken } = await addCashApi(data)
      if (!isSuccess) {
        return
      }
      getPaymentAll()
      onClose()
      setIsLoading(false)
      toast.success('成功新增 現金面交 收款資料!')
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
            <div className="modalCard-payTitle bg-colors-fifth">
              <LocalAtm sx={{ fontSize: 30 }} />
              <p>現金面交付款</p>
            </div>
            <form
              className="modalCard-payForm"
              onSubmit={handleSubmit(onSubmit)}>

              <div className='mb-11 ProfilePaymentModal-wrap'>
                <div className='mb-8 md:w-full md:mb-0'>
                  <label
                    className='labelTitle mb-1'
                    htmlFor="Name">
                    姓名
                  </label>
                  <input
                    id='Name'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入姓名"
                    {...register('Name',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.Name?.message}</p>

                  <label
                    className='labelTitle mt-7 mb-1'
                    htmlFor="Phone">
                    電話
                  </label>
                  <input
                    id='Phone'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入電話"
                    {...register('Phone',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.Phone?.message}</p>
                </div>

                <div className='md:w-full'>
                  <label
                    className='labelTitle mb-1'
                    htmlFor="Method">
                    聯絡訊息
                  </label>
                  <textarea
                    className="inputInfo pl-2 h-[75px] md:ProfilePaymentModal-textarea"
                    placeholder="請輸入面交相關地址資訊或其他資訊。"
                  />
                </div>
              </div>

              <div className='ProfilePaymentModal-wrap'>
                <div className='hidden md:block md:w-full' />
                <div className='md:flex md:justify-between md:w-full md:gap-4'>
                  <input
                    onClick={onClose}
                    type="button"
                    className='btn-outline-fifth mb-4 w-full cursor-pointer md:mb-0'
                    value='取消'
                  />
                  <input
                    className='btn-secondary w-full cursor-pointer'
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
