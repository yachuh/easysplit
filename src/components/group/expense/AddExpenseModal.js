import { useEffect, useState, useRef } from 'react'
import { useForm, FormProvider, useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { addExpenseApi } from '../../../utils/api'
import { useGroupData } from '../../../context/context'
import Modal from '@mui/material/Modal'
import { PayerListModal, OwnerListModal, ExpenseTypeModal } from '../GroupModal'
import { Edit, Delete, LastPage, Check, AttachMoney, CloseOutlined, Update, InsertPhoto } from '@mui/icons-material'
import DateField from './DateField'
import SelectPayer from './SelectPayer'

export default function AddExpenseModal ({ open, onClose }) {
  const { groupData, memberList, expenseTypeList, getAllExpense } = useGroupData()

  const [payerList, setPayerList] = useState([{
    MemberId: memberList[0].memberId,
    PayAmount: '',
    memberName: memberList[0].memberName,
    imageUrl: memberList[0].imageUrl
  }])
  const [ownerList, setOwnerList] = useState([])

  /* ---- Modals ---- */
  const [openOwnerListPopup, setOpenOwnerListPopup] = useState(false)
  const handleOpenOwnerListPopup = () => setOpenOwnerListPopup(true)
  const handleCloseOwnerListPopup = () => setOpenOwnerListPopup(false)
  const [openExpenseTypeModal, setOpenExpenseTypeModal] = useState(false)
  const handleOpenExpenseTypeModal = () => setOpenExpenseTypeModal(true)
  const handleCloseExpenseTypeModal = () => setOpenExpenseTypeModal(false)

  useEffect(() => {
    console.log('payerList:::', payerList)
    console.log('ownerList:::', ownerList)
  }, [payerList, ownerList])

  /* ---- react hook form configs START---- */
  const methods = useForm({
    defaultValues: {
      groupId: groupData.groupId,
      expenseType: 0,
      item: '',
      cost: 0,
      addPayerExpenseVMs: [],
      addOwnerExpenseVMs: [],
      addExpenseAlbumVMs: [],
      creatDate: new Date(Date.now()), // current time new Date(Date.now()).toISOString()
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
    getFieldState,
    formState: { errors, isValid }
  } = methods

  /* ---- react hook form configs END---- */

  const watchCost = watch('cost') // watch form inputs:cost
  const watchAllFields = watch()
  console.log(watchAllFields)

  const averageCost = parseFloat((watchCost / memberList.length)?.toFixed(2))

  // set initial values of addPayerExpenseVMs
  useEffect(() => {
    setValue('addPayerExpenseVMs.0.MemberId', memberList[0].memberId, { shouldValidate: true })
  }, [])

  // set amount when 'cost' changes
  useEffect(() => {
    setValue('addPayerExpenseVMs.0.PayAmount', watchCost, { shouldValidate: true }) // set payer's payAmount
    for (let i = 0; i < memberList.length; i++) {
      setValue(`addOwnerExpenseVMs.${i}.OwnAmount`, averageCost, { shouldValidate: true }) // set owner's OwnAmount
    }
  }, [watchCost])

  // get expenseType icon imageUrl
  const expenseTypeIcon = expenseTypeList.find(item => item.id === getValues('expenseType')).imageUrl

  // addExpenseApi
  const onSubmit = async data => {
    data.groupId = groupData.groupId // append groudId to data
    data.cost = parseFloat(data.cost) // convert cost from string to number
    const newDate = data.creatDate.toISOString()
    data.creatDate = newDate
    console.log('payload:::', data)
    try {
      const { status: isSuccess, message, addedExpenseId: expenseId } = await addExpenseApi(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      getAllExpense()
      console.log(message)
      console.log('expenseId:::', expenseId)
    } catch (error) {
      console.log(error)
    }
  }

  // a function to test onClikc target
  const testOnClick = (e) => {
    console.log(e.current.target)
  }

  return (
    <div>
      {/* ---- header icons ---- */}
      <div className="expenseModal-header">
        <Edit className="expenseModal-header-icon" />
        <Delete className="expenseModal-header-icon" />
        <Check className="expenseModal-header-icon" onClick={handleSubmit(onSubmit)} />
        <LastPage className="expenseModal-header-icon" />
      </div>
      {/* ---- epxense form ---- */}
      <FormProvider {...methods}>
        <form className="expenseModal-form formInput-text-correct" onSubmit={handleSubmit(onSubmit)}>
          {/* 日期:::creatDate */}
          {/* <DateField /> */}
          <div className="my-6">
            <DateField />
            <p className="text-xs mb-2 text-rose-600">{errors.creatDate?.message}</p>
          </div>
          {/* 名稱:::item ＆ 種類:::expenseType */}
          <div className="flex items-center gap-4 mb-[25px]">
            {/* 種類 */}
            <div className="relative w-8 h-8"
            >
              <button
                className="w-8 h-8 rounded hover:scale-105"
                onClick={() => {
                  console.log(openExpenseTypeModal)
                  if (!openExpenseTypeModal) {
                    handleOpenExpenseTypeModal()
                    return
                  }
                  handleCloseExpenseTypeModal()
                }}
              >
                <img src={expenseTypeIcon} alt="type" />
              </button>
              {/* ExpenseType dropdown START */}
              <div>
                {
                  openExpenseTypeModal && (
                    <ul
                      className="bg-white rounded w-[136px] h-[200px] flex flex-col gap-3 overflow-auto card-shadow font-medium absolute top-9 left-0 z-50"
                    >
                      {
                        expenseTypeList?.map((type, i) => {
                          return (
                            <li
                              key={i}
                              id={type.id}
                              className="flex items-center p-1 gap-4 cursor-pointer active:bg-gray-100 hover:text-color-dark-green"
                              onClick={() => {
                                // setExpenseType({ id: type.id, imageUrl: type.imageUrl })
                                setValue('expenseType', type.id, { shouldValidate: true })
                                handleCloseExpenseTypeModal()
                              }}
                            >
                              <img src={type.imageUrl} alt={type.expenseMethod} className="w-8 h-8" />
                              <p>{type.expenseMethod}</p>
                            </li>
                          )
                        })
                      }
                    </ul>
                  )
                }
              </div>
              {/* ExpenseType dropdown END */}
            </div>
            {/* 名稱 */}
            <label className="w-full">
              <input
                className="formInput py-1 px-3 align-middle"
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
                min="0"
                placeholder="0.00"
                {...register('cost', {
                  required: {
                    value: true,
                    message: '此為必填欄位'
                  },
                  valueAsNumber: true
                  // validate: {
                  //   value: (value) => value > 0,
                  //   message: '金額不可 < 0'
                  // }
                })}
              />
            </label>
          </div>
          {/* 付款＆分帳細節 payerExpenseVMs, ownerExpenseVMs */}
          <div className="mb-6">
            {/* 付款人 payerExpenseVMs */}
            <SelectPayer payerList={payerList} setPayerList={setPayerList} watchCost={watchCost}/>
            {/* 分帳人＆模式 ownerExpenseVMs */}
            <div className="ml-12 mt-6">
              <label className="w-full" onClick={handleOpenOwnerListPopup}>
                <p className="formInput py-1 px-4 mb-4">
                  平分（全部）
                </p>
                {/* SelecOwnerListModal START */}
                <Modal open={openOwnerListPopup} onClose={handleCloseOwnerListPopup} className="modalCard-bg">
                  <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
                    <div onClick={handleCloseOwnerListPopup} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                    <OwnerListModal open={openOwnerListPopup} onClose={handleCloseOwnerListPopup} ownerList={ownerList} setOwnerList={setOwnerList} watchCost={watchCost} />
                  </div>
                </Modal>
                {/* SelectOwnerListModal End */}
              </label>
              <ul className="overflow-scroll max-h-[30vh] pt-2 pb-2">
                {
                  memberList?.map((member, i) => {
                    const { memberName, memberId, imageUrl } = member
                    return (
                      <li
                        key={i}
                        className="singlePayment-payer mb-2"
                      >
                        <input
                          class="hidden"
                          type="number"
                          value={memberId}
                          {...register(`addOwnerExpenseVMs.${i}.MemberId`, {
                            valueAsNumber: true
                          })}
                        />
                        <input
                          type="text"
                          className="hidden"
                          value={averageCost}
                          {...register(`addOwnerExpenseVMs.${i}.OwnAmount`)} // undefined: register(`addOwnerExpenseVMs.${i}.OwnAmount`)
                        />
                        <img className="settlement-userImg w-8 h-8 drop-shadow-[2px_2px_5px_rgba(0,0,0,0.25)]" src={imageUrl} alt="payer" />
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-ellipsis">{memberName}</p>
                          <p className="text-xs">
                            需支付
                            <span className="text-base text-red-700 font-medium bg-white ml-3">
                              {averageCost}
                            </span>
                          </p>
                        </div>
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
              <textarea
                rows="2"
                className="formInput py-2 px-3 overflow-auto mt-1"
                {...register('memo')}
              />
            </label>
          </div>
          <div className="flex items-center gap-3 my-6">
            <label htmlFor="fileUpload" className="w-16 h-16 p-4 inline-block box-border bg-gray-300 rounded-md hover:drop-shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:cursor-pointer">
              <InsertPhoto className="w-6 h-6 text-white" />
            </label>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
            // onChange={handleImgChange}
            />
          </div>
          {/* 送出 */}
          <div className="mt-4">
            <input type="submit" className="btn-primary w-full" value="送出" disabled={(!isValid)} />
          </div>
        </form>
      </FormProvider>
      {/* footer */}
      {/* <div className="bg-colors-primary text-white px-6 py-4 mt-6">
      </div> */}
    </div >
  )
}
