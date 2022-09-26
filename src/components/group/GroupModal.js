import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import {
  addMemberApi,
  editMemberApi,
  delMemberApi,
  changeMemberRoleApi,
  delGroupApi
} from '../../utils/api'
import { useGroupData } from '../../context/context'
import GroupMemberListItem from './GroupMemberListItem'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Modal from '@mui/material/Modal'
import { Add, Edit, Delete, LastPage, Check, AttachMoney, CloseOutlined } from '@mui/icons-material'
import userSettlement from '../../image/userSettlement.svg'

/**
 * --------------------
 * 群組 - 成員 相關 modal
 * --------------------
 */

// 新增成員
export function AddNewMemberModal ({ open, onClose }) {
  const { groupId } = useParams()
  console.log('groupId', groupId)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      groupId,
      name: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      const { status: isSuccess, message } = await addMemberApi(data)
      console.log(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>新增成員</h4>
      </div>
      <form className="w-full relative text-center" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="groupModalCard-form-input-title">成員名稱</label>
          <input
            id="name"
            className="groupModalCard-form-input-box"
            type="text"
            placeholder="請輸入成員名稱"
            {...register('name', {
              required: {
                value: true,
                message: '此欄不可留空'
              }
            })}
          />
          <p className="text-xs mb-2 text-rose-600">{errors.name?.message}</p>
        </div>
        <p className="groupModalCard-Link">或是分享邀請連結給朋友</p>
        <div className="mt-[29px]">
          <input
            type="submit"
            className="btn-primary w-full"
            // onClick={handleUpload}
            value="建立"
          />
        </div>
      </form>
    </div>
  )
}

// 變更我的角色
export function ChangeRoleModal ({ open, onClose }) {
  const { memberList, getMemberList } = useGroupData()
  const [newMemberId, setNewMemberId] = useState()

  const ChangeMemberRole = async () => {
    const memberId = newMemberId
    console.log('onClick memberId:::', memberId)
    try {
      const { status: isSuccess, message } = await changeMemberRoleApi(memberId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
      getMemberList()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>變更角色</h4>
      </div>
      <p className="groupModalCard-text">點擊選擇你是群組中的哪一位成員</p>
      <p className="modalHint text-left m-0">之後仍可在群組設定中更改</p>
      <div>
        <ul className="border border-colors-primary rounded my-4 h-[144px] overflow-scroll">
          {
            memberList.map((member, i) => {
              return (
                <GroupMemberListItem key={i} {...member} setNewMemberId={setNewMemberId} />
              )
            })
          }
        </ul>
      </div>
      <button type="submit" onClick={ChangeMemberRole} className="btn-primary w-full">
        確認
      </button>
    </div>
  )
}

// 編輯成員
export function EditMemberModal ({ open, onClose, memberId, memberName }) {
  const { getMemberList } = useGroupData()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      memberId,
      editedName: memberName
    }
  })
  const onSubmitEdit = async (data) => {
    try {
      const { status: isSuccess, message } = await editMemberApi(data)
      console.log(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
      getMemberList()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>編輯成員</h4>
      </div>
      <form className="w-full relative text-center" onSubmit={handleSubmit(onSubmitEdit)}>
        <div>
          <label htmlFor="name" className="groupModalCard-form-input-title">成員名稱</label>
          <input
            id="name"
            className="groupModalCard-form-input-box"
            type="text"
            placeholder="請輸入成員名稱"
            {...register('editedName', {
              required: {
                value: true,
                message: '此欄不可留空'
              }
            })}
          />
          <p className="text-xs mb-2 text-rose-600">{errors.name?.message}</p>
        </div>
        <div className="mt-4">
          <input
            type="submit"
            className="btn-primary w-full"
            value="送出"
          />
        </div>
      </form>
    </div>
  )
}

// 刪除成員
export function DeleteMemberModal ({ open, onClose, memberId, memberName }) {
  const { getMemberList } = useGroupData()
  const onSubmitDelete = async () => {
    try {
      const { status: isSuccess, message } = await delMemberApi(memberId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
      getMemberList()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>刪除成員</h4>
      </div>
      <p className="groupModalCard-text">確定要將<span className="font-bold"> {memberName} </span>退出群組？</p>
      <p className="modalHint">
        請注意：此動作一經確認無法復原。<br></br>
        您將無法恢復該成員在群組中的紀錄。
      </p>
      <div className="groupModalCard-btns">
        <button type="submit" className="btn-outline  w-1/2" onClick={onClose}>
          取消
        </button>
        <button type="submit" className="btn-primary w-1/2" onClick={onSubmitDelete}>
          確認
        </button>
      </div>
    </div>
  )
}

/**
 * --------------------
 * 群組 - 設定 相關 modal
 * --------------------
 */

// 刪除群組
export function DeleteGroupModal ({ open, onClose }) {
  const { groupId } = useParams()
  const navigate = useNavigate()

  const onSubmitDelete = async () => {
    try {
      const { status: isSuccess, message } = await delGroupApi(groupId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
      onClose()
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>刪除群組</h4>
      </div>
      <p className="groupModalCard-text">確定要刪除群組？</p>
      <p className="modalHint">
        請注意：此動作一經確認無法復原。<br></br>
        您將無法恢復群組與其中的相關紀錄。
      </p>
      <div className="groupModalCard-btns">
        <button type="submit" className="btn-outline  w-1/2" onClick={onClose}>
          取消
        </button>
        <button type="submit" className="btn-primary w-1/2" onClick={onSubmitDelete}>
          確認
        </button>
      </div>
    </div>
  )
}

/**
 * --------------------
 * 群組 - 費用 相關 modal
 * --------------------
 */

export function AddNewExpenseModal ({ open, onClose }) {
  const { userData, groupData, memberList } = useGroupData()
  const currentTime = new Date(Date.now()).toISOString()

  const [startDate, setStartDate] = useState(new Date())
  const toCreateDateFormat = (time) => {
    return time.toISOString()
  }

  const [payerList, setPayerList] = useState([])
  const [ownerList, setOwnerList] = useState([])

  // popup
  const [openPayerListPopup, setOpenPayerListPopup] = useState(false)
  const handleOpenPayerListPopup = () => setOpenPayerListPopup(true)
  const handleClosePayerListPopup = () => setOpenPayerListPopup(false)
  const [openOwnerListPopup, setOpenOwnerListPopup] = useState(false)
  const handleOpenOwnerListPopup = () => setOpenOwnerListPopup(true)
  const handleCloseOwnerListPopup = () => setOpenOwnerListPopup(false)

  // setPayerList([
  //   {
  //     memberId: '',
  //     name: '',
  //     imageUrl: ''
  //   }
  // ])

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      groupId: groupData.groupId,
      expenseType: '',
      item: '',
      cost: '',
      payerExpenseVms: [],
      ownerExpenseVms: [],
      creatDate: currentTime,
      memo: ''
    }
  })

  // watch form inputs
  const watchCost = watch('cost', 0.00)
  const watchAllFields = watch()

  return (
    <div>
      {/* header icons */}
      <div className="expenseModal-header">
        <Edit sx={{ fontSize: 24 }} />
        <Delete sx={{ fontSize: 24 }} />
        <Check sx={{ fontSize: 24 }} />
        <LastPage sx={{ fontSize: 24 }} />
      </div>
      <form className="expenseModal-form formInput-text-correct" onSubmit={handleSubmit()}>
        {/* 日期 creatDate */}
        <div>
          <label className="groupModalCard-form-input-title">
            <DatePicker
              className="inputInfo pl-4 mt-3 mb-3"
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
        {/* 名稱 item ＆ 種類 expenseType */}
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
            <img className="settlement-userImg" src={userSettlement} alt="payer" />
            <label className="w-[100px]" onClick={handleOpenPayerListPopup}>
              <div className="singlePayment-name-single">
                <p className="formInput py-1 px-4">
                  {memberList[0].memberName}
                </p>
                <input
                  className="hidden"
                  type="text"
                  placeholder="付款人"
                  {...register('payerExpenseVms', {
                    required: {
                      value: true,
                      message: '此為必填欄位'
                    }
                  })}
                />
              </div>
              {/* SelectPayerModal START */}
              <Modal open={openPayerListPopup} onClose={handleClosePayerListPopup} className="modalCard-bg">
                <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
                  <div onClick={handleClosePayerListPopup} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                  <PayerListModal open={openPayerListPopup} onClose={handleClosePayerListPopup} payerList={payerList} setPayerList={setPayerList}/>
                </div>
              </Modal>
              {/* SelectPayerModal End */}
            </label>
            <p>支付</p>
            <p className="ml-3">$<span className="ml-2">{watchCost}</span></p>
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
                  {...register('payerExpenseVms', {
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
        <div className="mt-4">
          <input
            type="submit"
            className="btn-primary w-full"
            value="送出"
          />
        </div>
      </form>
    </div>
  )
}

export function PayerListModal ({ open, onClose, payerList, setPayerList }) {
  const { memberList, getMemberList } = useGroupData()
  const [payerExpenseVms, setpayerExpenseVms] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { payerExpenseVms } })

  const onSubmitPayerList = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>選擇付款人</h4>
      </div>
        <ul className="border border-colors-primary rounded my-4 h-[144px] overflow-scroll">
          {
            memberList.map((member, i) => {
              return (
                <GroupMemberListItem key={i} {...member} />
              )
            })
          }
        </ul>
      {/* <button type="submit" onClick={onSubmitPayerList} className="btn-primary w-full">
        確認
      </button> */}
      <button onClick={console.log('切換至 +多人付款 popup')} className="flex items-center text-colors-primary font-bold">
        <Add sx={{ fontSize: 20 }} className="mr-2"/>
        多人付款
      </button>
    </div>
  )
}

export function OwnerListModal ({ open, onClose }) {
  const { memberList, getMemberList } = useGroupData()
  const [payerExpenseVms, setpayerExpenseVms] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { payerExpenseVms } })

  const onSubmitPayerList = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>選擇分帳人及金額</h4>
      </div>
      <p className="groupModalCard-text">分帳模式：按人數平均分配</p>
      <form onSubmit={handleSubmit(onSubmitPayerList)}>
        <div className="border border-colors-primary rounded my-4 h-[144px] overflow-scroll">
          {
            memberList.map((member, i) => {
              const { memberId, memberName, imageUrl } = member
              return (
                <label key={i} {...member}>
                  <input
                    type="checkbox"
                    value={memberName}
                    {...register('payerListVms', {
                      required: {
                        value: true,
                        message: '請選擇至少一個成員'
                      }
                    })}
                  />
                  {memberName}
                </label>
              )
            })
          }
        </div>
        <input
          type="submit"
          className="btn-primary w-full"
          value="確認"
        />
      </form>
    </div>
  )
}
