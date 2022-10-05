import { useEffect, useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { addExpenseApi, getExpenseApi, editExpenseApi, editExpenseImgApi, delExpenseApi } from '../../../utils/api'
import { useGroupData } from '../../../context/context'
import DateField from './DateField'
import SelectPayer from './SelectPayer'
import SelectOwner from './SelectOwner'
import AttachPhotos from './AttachPhotos'
import Modal from '@mui/material/Modal'
import { DeleteExpenseModal } from '../GroupModal'
import { Edit, Delete, LastPage, Check, AttachMoney, CloseOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'

export default function AddExpenseModal ({ open, onClose, expenseId, expenseData, setExpenseData }) {
  const { groupData, memberList, expenseTypeList, getAllExpense } = useGroupData()
  const [editModeEnabled, setEditModeEnabled] = useState(false) // switch on & off edit mode

  const getExpense = async (expenseId) => {
    try {
      const { status: isSuccess, message, expenseData } = await getExpenseApi(expenseId)
      if (!isSuccess) {
        // console.log(message)
      }
      const expenseDetail = expenseData[0]
      setExpenseData(expenseDetail)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getExpense(expenseId)
  }, [expenseId])

  useEffect(() => {
    if (!expenseId) {
      setEditModeEnabled(true)
    }
  }, [])

  // console.log('expenseData:::', expenseData)
  // console.log('expenseId:::', expenseId)

  /* ---- Modals ---- */
  const [openExpenseTypeModal, setOpenExpenseTypeModal] = useState(false)
  const handleOpenExpenseTypeModal = () => setOpenExpenseTypeModal(true)
  const handleCloseExpenseTypeModal = () => setOpenExpenseTypeModal(false)
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState(false)
  const handleOpenDeleteExpenseModal = () => setOpenDeleteExpenseModal(true)
  const handleCloseDeleteExpenseModal = () => setOpenDeleteExpenseModal(false)

  /* ---- react hook form configs START---- */
  // defaultValues depends on whether it's add-new-expense(no expenseId) or check-single-expense modal
  const recordDefaultValues = {
    groupId: groupData.groupId,
    expenseType: expenseData?.expenseType,
    item: expenseData?.item,
    cost: expenseData?.cost,
    addPayerExpenseVMs: expenseData?.payerList,
    addOwnerExpenseVMs: expenseData?.ownerList,
    addExpenseAlbumVMs: expenseData?.photoList,
    creatDate: new Date(expenseData?.creatDate),
    memo: expenseData?.memo
  }
  const addDefaultValues = {
    groupId: groupData.groupId,
    expenseType: 0,
    item: '',
    cost: 0,
    addPayerExpenseVMs: [{
      MemberId: memberList[0].memberId,
      PayAmount: 0
    }],
    addOwnerExpenseVMs: [],
    addExpenseAlbumVMs: [],
    creatDate: new Date(Date.now()), // current time new Date(Date.now()).toISOString()
    memo: ''
  }
  // const editDefaultValues = {
  //   id: expenseId,
  //   groupId: groupData.groupId,
  //   expenseType: expenseData?.expenseType,
  //   item: expenseData?.item,
  //   cost: expenseData?.cost,
  //   payerExpenseVMs: expenseData?.payerList,
  //   ownerExpenseVMs: expenseData?.ownerList,
  //   expenseAlbumVMs: expenseData?.photoList,
  //   creatDate: new Date(expenseData?.creatDate),
  //   memo: expenseData?.memo
  // }
  // const defaultValues = () => {
  //   if (!expenseId) {
  //     return addDefaultValues
  //   } else if (!editModeEnabled) {
  //     return editDefaultValues
  //   }
  //   return recordDefaultValues
  // }
  const defaultValues = expenseId ? recordDefaultValues : addDefaultValues

  const methods = useForm({
    defaultValues
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

  // print current form data
  const watchAllFields = watch()
  // console.log(watchAllFields)

  // watch 'Cost' change & calculate avg cost
  const watchCost = watch('cost') // watch form inputs:cost
  const averageCost = parseFloat((watchCost / memberList.length)?.toFixed(2))

  // set amount when 'cost' changes
  useEffect(() => {
    setValue('addPayerExpenseVMs.0.PayAmount', watchCost, { shouldValidate: true }) // set payer's payAmount
    for (let i = 0; i < memberList.length; i++) {
      setValue(`addOwnerExpenseVMs.${i}.OwnAmount`, averageCost, { shouldValidate: true }) // set owner's OwnAmount
    }
  }, [watchCost])

  // get expenseType icon imageUrl
  const expenseTypeIcon = expenseTypeList.find(item => item.id === getValues('expenseType'))?.imageUrl

  // addExpenseApi
  const onSubmit = async data => {
    data.groupId = groupData.groupId // append groudId to data
    data.cost = parseFloat(data.cost) // convert cost from string to number
    const dateIsoFormat = data.creatDate.toISOString() // convert value(string) to ISO string format
    data.creatDate = dateIsoFormat
    // console.log('payload:::', data)
    try {
      const { status: isSuccess, message, addedExpenseId: expenseId } = await addExpenseApi(data)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      toast.success('已新增費用')
      getAllExpense()
      // console.log(message)
      // console.log('expenseId:::', expenseId)
    } catch (error) {
      console.log(error)
    }
  }

  /* ---- payer & owner list ---- */
  const [payerList, setPayerList] = useState([{
    MemberId: memberList[0].memberId,
    PayAmount: '',
    memberName: memberList[0].memberName,
    imageUrl: memberList[0].imageUrl
  }])
  const [ownerList, setOwnerList] = useState([])
  useEffect(() => {
    // console.log('payerList:::', payerList)
    // console.log('ownerList:::', ownerList)
  }, [payerList, ownerList])

  // a function to test onClick target
  const testOnClick = (e) => {
    // console.log(e.current.target)
  }

  const onClickEdit = () => {
    setEditModeEnabled(!editModeEnabled)
    // console.log(editModeEnabled)
  }

  const onSubmitEdit = async (data) => {
    data.groupId = groupData.groupId // append groudId to data
    data.cost = parseFloat(data.cost) // convert cost from string to number
    const dateIsoFormat = data.creatDate.toISOString() // convert value(string) to ISO string format
    data.creatDate = dateIsoFormat
    data.Id = expenseId
    data.ownerExpenseVMs = data.addOwnerExpenseVMs
    delete data.addOwnerExpenseVMs
    data.payerExpenseVMs = data.addPayerExpenseVMs
    delete data.addPayerExpenseVMs
    data.expenseAlbumVMs = data.addExpenseAlbumVMs
    delete data.addExpenseAlbumVMs
    // console.log('payload:::', data)
    try {
      const res = await editExpenseApi(data)
      // if (!isSuccess) {
      //   console.log(res)
      //   return
      // }
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {/* ---- header icons ---- */}
      <div className="expenseModal-header">
        { editModeEnabled // only show edit button when it's not under edit mode
          ? <></>
          : <Edit className="expenseModal-header-icon" onClick={onClickEdit}/>
        }
        { expenseId // only show delete button when expenseId isn't undefined
          ? <Delete className="expenseModal-header-icon" onClick={handleOpenDeleteExpenseModal} />
          : <></>
        }
        {/* DeleteExpenseModal START */}
        <Modal open={openDeleteExpenseModal} onClose={handleCloseDeleteExpenseModal} className="modalCard-bg">
          <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
            <div onClick={handleCloseDeleteExpenseModal} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
            <DeleteExpenseModal open={openDeleteExpenseModal} onClose={handleCloseDeleteExpenseModal} expenseId={expenseId} getAllExpense={getAllExpense}/>
          </div>
        </Modal>
        {/* DeleteExpenseModal End */}
        { expenseId && editModeEnabled // only show check button under edit mode & if expenseId is undefined
          ? <Check className="expenseModal-header-icon"
              onClick={handleSubmit(onSubmitEdit)}
              disabled={(!isValid)}
            />
          : <></>
        }
        <LastPage className="expenseModal-header-icon" onClick={onClose}/>
      </div>
      {/* ---- epxense form ---- */}
      <FormProvider {...methods} editModeEnabled={editModeEnabled}>
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
            <div className="relative w-8 h-8">
              <button
                disabled={!editModeEnabled}
                className="w-8 h-8 rounded hover:scale-105"
                onClick={(e) => {
                  e.preventDefault()
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
                      className="bg-white rounded w-[136px] h-[200px] p-1 flex flex-col gap-3 overflow-auto card-shadow font-medium absolute top-10 left-0 z-50"
                    >
                      {
                        expenseTypeList?.map((type, i) => {
                          return (
                            <li
                              key={i}
                              id={type.id}
                              className="flex items-center p-1 gap-4 cursor-pointer active:bg-gray-100 hover:text-color-dark-green"
                              onClick={(e) => {
                                // setExpenseType({ id: type.id, imageUrl: type.imageUrl })
                                e.preventDefault()
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
                disabled={!editModeEnabled}
                className="formInput py-1 px-3 align-middle disabled:border-none"
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
                disabled={!editModeEnabled}
                className="formInput py-1 px-3 disabled:border-none"
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
            <SelectPayer payerList={payerList} setPayerList={setPayerList} watchCost={watchCost} editModeEnabled={editModeEnabled} />
            {/* 分帳人＆模式 ownerExpenseVMs */}
            <div className="ml-12 mt-6">
              <SelectOwner ownerList={ownerList} setOwnerList={setOwnerList} watchCost={watchCost} editModeEnabled={editModeEnabled} />
              {/* Display owners & individaul ownAmount */}
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
                          className="hidden"
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
                disabled={!editModeEnabled}
                rows="1"
                className="formInput py-2 px-3 overflow-auto mt-1 disabled:border-none"
                {...register('memo')}
              />
            </label>
          </div>
          {/* 圖片 addExpenseAlbumVMs */}
          {/* <AttachPhotos /> */}
          {/* 送出 btn */}
          { !expenseId && editModeEnabled
            ? <div className="mt-4">
                <input
                  type="submit"
                  className="btn-primary w-full"
                  value="送出"
                  disabled={(!isValid)} />
              </div>
            : <></>
          }

        </form>
      </FormProvider>
      {/* footer */}
      {/* <div className="bg-colors-primary text-white px-6 py-4 mt-6">
      </div> */}
    </div>
  )
}
