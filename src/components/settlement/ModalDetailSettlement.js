import React, { useState, useEffect } from 'react'
import { ArrowCircleDown } from '@mui/icons-material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getPaymentTypeApi } from '../../utils/api'
import userSettlement from '../../image/userSettlement.svg'

export const ModalDetailSettlement = () => {
  const [startDate, setStartDate] = useState(new Date())

  const [paymentTypeData, setPaymentTypeData] = useState({
    paymentType: []
  })

  const getPaymentType = async () => {
    try {
      const { paymentType } = await getPaymentTypeApi()
      setPaymentTypeData(paymentTypeData => ({
        ...paymentTypeData,
        paymentType
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPaymentType()
  }, [])

  console.log(paymentTypeData)

  const mapPaymentType = paymentTypeData.paymentType.map((paymentType, i) => {
    const { paymentMethod } = paymentType

    return <option>{paymentMethod}</option>
  })

  return (
        <div className='w-full'>
            <p className='modalSettlement-title'>結算</p>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-colors-primary'>From</p>
                <div className='flex gap-3 items-center'>
                    <img
                        className='settlement-userImg'
                        src={userSettlement}
                        alt='userSettlement'
                    />
                    <p className='font-bold text-black'>蔡一零</p>
                </div>
            </div>
            <p className='text-gray-400 text-left'>支付</p>
            <div className='flex justify-between items-center mb-2 gap-1'>
                <p className='w-[25%] font-bold text-colors-primary'>NTD $</p>
                <input
                    id="account"
                    className="inputInfo pl-4 w-[75%]"
                    type="text"
                />
            </div>
            <div className='py-1 text-center text-colors-primary'>
                <ArrowCircleDown sx={{ fontSize: 30 }} />
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-colors-primary'>To</p>
                <div className='flex gap-3 items-center'>
                    <img
                        className='settlement-userImg'
                        src={userSettlement}
                        alt='userSettlement'
                    />
                    <p className='font-bold text-black'>粥杰倫</p>
                </div>
            </div>
            <p className='text-gray-400 text-left mb-2'>的收款方式</p>
            <select id="area" className="inputInfo px-4 text-black mb-3">
                {mapPaymentType}
            </select>
            <hr />
            <DatePicker
                className='inputInfo pl-4 mt-3 mb-3'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            <div className='flex gap-3'>
                <div className='w-1/2'>
                    <label
                        className='labelTitle'
                        htmlFor="remark">
                        註記
                    </label>
                    <textarea
                        className="inputInfo pl-2 h-[40px]"
                        placeholder="備註或其他資訊。"
                    />
                </div>
                <div className='w-1/2'>
                    <label
                        className='labelTitle'
                        htmlFor="qrcode">
                        新增圖片
                    </label>
                    <input
                        id='qrcode'
                        className="inputInfo pl-2 mb-3"
                        type="file"
                        placeholder="上傳"
                    />
                </div>
            </div>

            <div className='w-full flex justify-between gap-4'>
                <button
                    // onClick={onClose}
                    className="btn-outline w-full">
                    取消
                </button>
                <button
                    className="btn-primary w-full">
                    確認
                </button>
            </div>
        </div>
  )
}
