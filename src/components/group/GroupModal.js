import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { addMemberApi, editMemberApi, delMemberApi, changeMemberRoleApi, delGroupApi } from '../../utils/api'
import { useGroupData } from '../../context/context'
import GroupMemberListItem from './GroupMemberListItem'
import { Add } from '@mui/icons-material'

/**
 * ==== 群組 - 成員 相關 modal ====
 */

// 新增成員
export function AddNewMemberModal ({ open, onClose }) {
  const { groupId } = useParams()
  console.log('groupId', groupId)
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
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
            value="建立"
            disabled={!isDirty && !isValid}
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
      <button
        type="submit"
        onClick={ChangeMemberRole}
        className="btn-primary w-full"
      >
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
    formState: { errors, isDirty, isValid }
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
                message: '此為必填欄位'
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
            disabled={!isDirty || !isValid}
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
 * ==== 群組 - 設定 相關 modal ====
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
 * ==== 群組 - 新增費用 相關 modal ====
 */

export function PayerListModal ({ open, onClose, payerList, setPayerList, watchCost }) {
  const { memberList } = useGroupData()
  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useFormContext()

  const {
    fields,
    append,
    update,
    replace,
    remove
  } = useFieldArray({
    control,
    name: 'addPayerExpenseVms'
  })

  const handleOnClick = e => {
    e.preventDefault()
    console.log(e.currentTarget.id)
    const newPayerList = [{
      MemberId: e.currentTarget.id,
      PaymentAmount: watchCost,
      memberName: e.currentTarget.dataset.name,
      imageUrl: e.currentTarget.dataset.imageurl
    }]
    console.log('newPayerList:::', newPayerList)
    setPayerList(newPayerList)
    replace([{ MemberId: e.currentTarget.id, PaymentAmount: watchCost }])
    onClose()
  }

  return (
    <div className="w-full">
      <div className="groupModalCard-title">
        <h4>選擇付款人</h4>
      </div>
      <ul className="overflow-scroll-view h-[190px] w-full border border-colors-primary rounded">
        {/* {
            fields.map((item, index) => {
              <li
                key={item.id}
                className="flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer hover:bg-colors-fifth/20"
              >
                <input
                  {...register(`addPayerExpenseVms.${index}.MemberId`)}
                />
                <Controller
                  render={({ field }) => <input {...field} />}
                  name={`addPayerExpenseVms.${index}.PaymentAmount`}
                  control={control}
                />
              </li>
            })
          } */}
        {
            memberList.map((member, i) => {
              const { memberId, memberName, imageUrl } = member
              return (
                <li
                  key={i} // fields[i].id
                  id={memberId}
                  onClick={handleOnClick}
                  data-name={memberName}
                  data-imageurl={imageUrl}
                  className="flex w-full justify-between text-base pt-2 pb-3 px-4 font-bold cursor-pointer hover:bg-colors-fifth/20"
                  value={memberId}
                  // {...register(`addPayerExpenseVms.${i}.MemberId`)}
                >
                  <div className="member-item-user">
                    <img className="member-item-avatar" src={imageUrl} alt={memberName} />
                    <div className="member-item-info">
                      <p className="mb-1 md:mb-0">{memberName}</p>
                    </div>
                  </div>
                </li>
              )
            })
          }
      </ul>
      <button onClick={() => { console.log('切換至 +多人付款 popup') }} className="flex items-center text-colors-primary font-bold mt-6">
        <Add sx={{ fontSize: 20 }} className="mr-2" />
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