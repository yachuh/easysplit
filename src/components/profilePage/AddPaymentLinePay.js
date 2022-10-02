import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ArrowCircleUp } from '@mui/icons-material'
import { addLinePayApi, addLinePayQRcodeApi } from '../../utils/api'
import { usePayData } from '../../context/context'
import linePayIcon from '../../image/linePay-sm.svg'
import LoadingModal from '../LoadingModal'

export default function AddPaymentLinePay ({ onClose, getPaymentAll }) {
  const [isLoading, setIsLoading] = useState(false)
  const { payData, setPayData } = usePayData()
  const { line } = payData
  console.log('payData', line)

  // const [imageValue, setImageValue] = useState()

  const [image, setImage] = useState({
    preview: '',
    raw: ''
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      Name: '',
      LineID: '',
      Phone: '',
      QRCode: ''
    }
  })

  // setImage state after user upload file
  const handleChange = e => {
    console.log('e :>> ', e)
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      })
    }
  }

  // console.log('image :>> ', image)

  // 圖片
  const handleUpload = async () => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', image.raw)
    // if img is empty, set payload to null
    const payload = image.raw ? formData : null

    setIsLoading(true)
    try {
      const { status: isSuccess, message, QRCode } = await addLinePayQRcodeApi(payload)

      if (!isSuccess) {
        // console.log(message)
        return
      }
      console.log('editGroupCoverApi:::', message, QRCode)
      setValue('QRCode', QRCode) // 好像沒有作用
      // setPayData(payData => ({
      //   ...payData,
      //   line: {
      //     qrCodeUrl: QRCode.Image
      //   }
      // }))
      setIsLoading(false)
      // return QRCode
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data, QRCode) => {
    data.QRCode = QRCode

    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await addLinePayApi(data)
      if (!isSuccess) {
        return
      }
      getPaymentAll()
      onClose()
      setIsLoading(false)
      toast.success('成功新增 LinePay 收款資料!')
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
              onSubmit={handleSubmit(async (data) => {
                const QRCode = await handleUpload()
                await onSubmit(data, QRCode)
              })}>

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
                    htmlFor="LineID">
                    LINE ID
                  </label>
                  <input
                    id='LineID'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入電話"
                    {...register('LineID',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.LineID?.message}</p>
                </div>

                <div className='mb-8 md:w-full md:mb-0'>
                  <label
                    className='labelTitle mb-1'
                    htmlFor="Phone">
                    手機號碼
                  </label>
                  <input
                    id='Phone"'
                    className="inputInfo pl-2 mb-1"
                    type="text"
                    placeholder="請輸入手機號碼"
                    {...register('Phone',
                      { required: '此為必填欄位' }
                    )} />
                  <p className="text-xs text-rose-600">{errors.Phone?.message}</p>

                  <div>
                    <p className='labelTitle mt-7 mb-1'>
                      收款二維碼 (選填)
                    </p>
                    <label
                      htmlFor="QRCodefileUpload"
                      className="ProfilePay-coverPhoto flex flex-col text-gray-300 justify-center items-center">
                      {image.preview
                        ? (
                          <img src={image.preview} alt="avatar" className="ProfilePay-coverPhoto-preview" />
                          )
                        : (
                          <div className="text-gray-300">
                            <ArrowCircleUp sx={{ fontSize: 28 }} />
                          </div>
                          )}
                    </label>
                    <input
                      id='QRCodefileUpload'
                      className="hidden"
                      type="file"
                      onChange={handleChange}
                    />
                  </div>

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
