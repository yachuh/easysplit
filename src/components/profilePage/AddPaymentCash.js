import React from 'react'
import { useForm } from 'react-hook-form'
import { addCashApi } from '../../utils/api'
import { LocalAtm } from '@mui/icons-material'

export default function AddPaymentCash ({ onClose, getPaymentAll }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      method: ''
    }
  })
  const onSubmit = async data => {
    console.log(data)

    try {
      const { status: isSuccess, message, jwtToken } = await addCashApi(data)
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
              htmlFor="name">
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
              htmlFor="phone">
              電話
            </label>
            <input
              id='phone'
              className="inputInfo pl-2 mb-1"
              type="text"
              placeholder="請輸入電話"
              {...register('phone',
                { required: '此為必填欄位' }
              )} />
            <p className="text-xs text-rose-600">{errors.phone?.message}</p>
          </div>

          <div className='md:w-full'>
            <label
              className='labelTitle mb-1'
              htmlFor="method">
              聯絡訊息
            </label>
            <textarea
              className="inputInfo pl-2 h-[75px] md:ProfilePaymentModal-textarea"
              placeholder="請輸入面交相關地址資訊或其他資訊。"
              {...register('method', {})}

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
  )
}
