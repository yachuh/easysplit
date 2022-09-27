import { useEffect, useState } from 'react'
import { useForm, FormProvider, useFormContext, useFieldArray } from 'react-hook-form'
import { addExpenseApi } from '../../../utils/api'
import { useGroupData } from '../../../context/context'
import Modal from '@mui/material/Modal'
import { PayerListModal, OwnerListModal } from '../GroupModal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Edit, Delete, LastPage, Check, AttachMoney, CloseOutlined, Update } from '@mui/icons-material'

// convert DatePicker time to ISOS format
const toCreateDateFormat = (time) => {
  return time.toISOString()
}

export default function AddExpenseModal ({ open, onClose }) {
  const { groupData, memberList, expenseTypeList } = useGroupData()
  const currentTime = new Date(Date.now()).toISOString()

  const [startDate, setStartDate] = useState(new Date())
  const [payerList, setPayerList] = useState([{
    MemberId: memberList[0].memberId,
    PaymentAmount: '',
    memberName: memberList[0].memberName,
    imageUrl: memberList[0].imageUrl
  }])
  const [ownerList, setOwnerList] = useState([])

  /* ---- popups ---- */
  const [openPayerListPopup, setOpenPayerListPopup] = useState(false)
  const handleOpenPayerListPopup = () => setOpenPayerListPopup(true)
  const handleClosePayerListPopup = () => setOpenPayerListPopup(false)
  const [openOwnerListPopup, setOpenOwnerListPopup] = useState(false)
  const handleOpenOwnerListPopup = () => setOpenOwnerListPopup(true)
  const handleCloseOwnerListPopup = () => setOpenOwnerListPopup(false)

  useEffect(() => {
    console.log('payerList:::', payerList)
  }, [payerList])

  /* ---- react hook form configs START---- */
  const methods = useForm({
    defaultValues: {
      groupId: groupData.groupId,
      expenseType: '',
      item: '',
      cost: '',
      addPayerExpenseVms: [],
      addOwnerExpenseVms: [],
      addExpenseAlbumsVms: [],
      creatDate: currentTime,
      memo: ''
    }
  })

  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = methods

  const { update } = useFieldArray({
    control,
    name: 'addPayerExpenseVms'
  })

  /* ---- react hook form configs END---- */

  const watchCost = watch('cost', 0.00) // watch form inputs:cost
  const watchAllFields = watch()
  console.log(watchAllFields)

  // const mapPayerUserData = () => {
  //   const payerUserList = payerList.forEach(payer => {
  //     let i = 0
  //     if (payer.id === memberList[i].memberId) {
  //       const member = {
  //         memberId: memberList[i].memberId,
  //         memberName: memberList[i].memberName,
  //         imageUrl: memberList[i].imageUrl
  //       }
  //       return member
  //     }
  //     i++
  //   })
  //   setPayerUserData(payerUserList)
  //   console.log('payerUserData:::', payerUserData)
  // }

  useEffect(() => {
    setValue('addPayerExpenseVms.0.PaymentAmount', watchCost)
  }, [watchCost])

  // const handleOnChangeCost = () => {
  //   update(0, { PaymentAmount: watchCost })
  // }

  return (
    <div>
      {/* ---- header icons ---- */}
      <div className="expenseModal-header">
            <Edit sx={{ fontSize: 24 }} />
            <Delete sx={{ fontSize: 24 }} />
            <Check sx={{ fontSize: 24 }} />
            <LastPage sx={{ fontSize: 24 }} />
      </div>
      {/* ---- epxense form ---- */}
      <FormProvider {...methods} >
        <form className="expenseModal-form formInput-text-correct" onSubmit={handleSubmit()}>
        {/* 日期:::creatDate */}
        <div className="mt-6">
          <label className="groupModalCard-form-input-title">
            <DatePicker
              className="singlePayment-datePick pl-4 mt-3 mb-3"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <input
              className="hidden"
              type="text"
              placeholder="請選擇日期"
              {...register('creatDate', {
                required: {
                  value: true,
                  message: '此為必填欄位'
                }
              })}
            />
          </label>
          <p className="text-xs mb-2 text-rose-600">{errors.name?.message}</p>
        </div>
        {/* 名稱:::item ＆ 種類:::expenseType */}
        <div className="flex items-center gap-4 mb-[25px]">
            <div className="w-8 h-8 p-1 rounded bg-black"><img src="" alt=""></img></div>
            <label className="w-full">
                <input
                    className="formInput py-1 px-3"
                    type="text"
                    placeholder="請輸入名稱"
                    {...register('item', {
                      required: {
                        value: true,
                        message: '此為必填欄位'
                      }
                    })}
                />
            </label>
        </div>
        {/* 金額 cost */}
        <div className="flex items-center gap-4">
            <AttachMoney sx={{ fontSize: 32 }} className="text-color-dark-green" />
            <label className="w-full">
                <input
                    className="formInput py-1 px-3"
                    type="number"
                    placeholder="0.00"
                    {...register('cost', {
                      required: {
                        value: true,
                        message: '此為必填欄位'
                      },
                      valueAsNumber: true
                    })}
                />
            </label>
        </div>
        {/* 付款＆分帳細節 payerExpenseVms, ownerExpenseVms */}
        <div className="mb-6">
            {/* 付款人 payerExpenseVms */}
            <div className="singlePayment-payer mt-7">
                <img className="settlement-userImg" src={payerList[0].imageUrl} alt="payer" />
                <label className="w-[120px]">
                    <div className="singlePayment-name">
                      <p
                        className="formInput singlePayment-name py-1 px-4 overflow-hidden text-ellipsis"
                        onClick={handleOpenPayerListPopup}
                      >
                          {payerList[0].memberName}
                      </p>
                      {/* { payerUserData.map((payer, i) => {
                        return (
                          <p key={i} className="formInput singlePayment-name py-1 px-4 overflow-hidden text-ellipsis">
                          {payer.memberId}
                        </p>
                        )
                      })} */}
                        {/* <input
                            className="hidden"
                            type="text"
                            placeholder="付款人"
                            {...register('addPayerExpenseVms', {
                              required: {
                                value: true,
                                message: '此為必填欄位'
                              }
                            })}
                        /> */}
                    </div>
                    {/* SelectPayerModal START */}
                    <Modal open={openPayerListPopup} onClose={handleClosePayerListPopup} className="modalCard-bg">
                        <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
                            <div onClick={handleClosePayerListPopup} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                            <PayerListModal open={openPayerListPopup} onClose={handleClosePayerListPopup} payerList={payerList} setPayerList={setPayerList} watchCost={watchCost}/>
                        </div>
                    </Modal>
                    {/* SelectPayerModal End */}
                </label>
                <div className="flex items-center gap-3">
                  <p>支付</p>
                  <p className="ml-auto text-color-dark-green">
                    $<span className="ml-2">{watchCost}</span>
                  </p>
                </div>

            </div>
            {/* 分帳人＆模式 ownerExpenseVms */}
            <div className="ml-12 mt-6">
                <label className="w-full" onClick={handleOpenOwnerListPopup}>
                    <p className="formInput py-1 px-4">
                        平分（全部）
                    </p>
                    <input
                        className="hidden"
                        type="text"
                        placeholder="付款人"
                        {...register('addOwnerExpenseVms', {
                          required: {
                            value: true,
                            message: '此為必填欄位'
                          }
                        })}
                    />
                    {/* SelecOwnerListModal START */}
                    <Modal open={openOwnerListPopup} onClose={handleCloseOwnerListPopup} className="modalCard-bg">
                        <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
                            <div onClick={handleCloseOwnerListPopup} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                            <OwnerListModal open={openOwnerListPopup} onClose={handleCloseOwnerListPopup} ownerList={ownerList} setOwnerList={setOwnerList} />
                        </div>
                    </Modal>
                    {/* SelectOwnerListModal End */}
                </label>
                <ul>
                    {
                        memberList?.map((member, i) => {
                          const { memberName, imageUrl } = member
                          return (
                                <li key={i} className="singlePayment-payer">
                                    <img className="settlement-userImg" src={imageUrl} alt="payer" />
                                    <p>{memberName}</p>
                                    <p>需支付</p>
                                    <p>$ 448.17</p>
                                </li>
                          )
                        })
                    }
                </ul>
            </div>

        </div>
        {/* 註記 memo */}
        <div>
            <label className="w-full">
                <p>註記</p>
                <input
                    className="formInput py-1 px-3"
                    type="textarea"
                    {...register('memo')}
                />
            </label>
        </div>
        {/* 送出 */}
        <div className="mt-4">
            <input
                type="submit"
                className="btn-primary w-full"
                value="送出"
            />
        </div>
      </form>
      </FormProvider>
    </div>
  )
}
