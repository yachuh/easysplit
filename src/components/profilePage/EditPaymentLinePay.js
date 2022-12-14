import React from 'react'
import { useForm } from 'react-hook-form'
import linePayIcon from '../../image/linePay-sm.svg'

export default function EditPaymentLinePay ({ payLine, onClose }) {
  //   const { id, name, phone, lineId, qrCode } = payLine
  //   console.log(name, phone, lineId)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      lineid: '',
      phone: '',
      qrcode: ''
    }
  })
  const onSubmit = data => console.log(data)
  console.log(errors)

  return (
        <>
            <div className="modalCard-payTitle bg-line-pay text-white">
                <img
                    className='w-6'
                    src={linePayIcon}
                    alt='linePayIcon'
                />
                <p>LINE PAY</p>
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
                            htmlFor="lineid">
                            LINE ID
                        </label>
                        <input
                            id='lineid'
                            className="inputInfo pl-2 mb-1"
                            type="text"
                            placeholder="請輸入電話"
                            {...register('lineid',
                              { required: '此為必填欄位' }
                            )} />
                        <p className="text-xs text-rose-600">{errors.lineid?.message}</p>
                    </div>

                    <div className='mb-8 md:w-full md:mb-0'>
                        <label
                            className='labelTitle mb-1'
                            htmlFor="phone">
                            手機號碼
                        </label>
                        <input
                            id='phone"'
                            className="inputInfo pl-2 mb-1"
                            type="text"
                            placeholder="請輸入手機號碼"
                            {...register('phone',
                              { required: '此為必填欄位' }
                            )} />
                        <p className="text-xs text-rose-600">{errors.phone?.message}</p>

                        <label
                            className='labelTitle mt-7 mb-1'
                            htmlFor="qrcode">
                            收款二維碼 (選填)
                        </label>
                        <input
                            id='qrcode'
                            className="inputInfo pl-2 mb-1"
                            type="file"
                            placeholder="上傳"
                            {...register('qrcode', {})}
                        />
                    </div>
                </div>

                <div className='ProfilePaymentModal-wrap'>
                    <div className='hidden md:block md:w-full' />
                    <div className='md:flex md:justify-between md:w-full md:gap-4'>
                        <input
                            onClick={onClose}
                            type="button"
                            className='btn-outline-linepay mb-4 w-full cursor-pointer md:mb-0'
                            value='取消'
                        />
                        <input
                            className='btn-linePay w-full cursor-pointer'
                            type="submit"
                            value='儲存'
                        />
                    </div>
                </div>
            </form>
        </>
  )
}
