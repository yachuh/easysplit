import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { addMemberApi, editMemberApi, delMemberApi, changeMemberRoleApi } from '../../utils/api'
import { useGroupData } from '../../context/context'
import GroupMemberListItem from './GroupMemberListItem'
import LoadingModal from '../LoadingModal'

// 新增成員
export function AddNewMemberModal ({ onClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const { groupId } = useParams()
  // console.log('groupId', groupId)
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
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await addMemberApi(data)
      // console.log(data)
      if (!isSuccess) {
        return
      }
      onClose()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div className="w-full">
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
      }
    </>

  )
}

// 變更我的角色
export function ChangeRoleModal ({ onClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const { memberList, getMemberList } = useGroupData()
  const [newMemberId, setNewMemberId] = useState()

  const ChangeMemberRole = async () => {
    const memberId = newMemberId
    // console.log('onClick memberId:::', memberId)
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await changeMemberRoleApi(memberId)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      // console.log(message)
      getMemberList()
      onClose()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div className="w-full">
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
          </div>}
    </>

  )
}

// 編輯成員
export function EditMemberModal ({ onClose, memberId, memberName }) {
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await editMemberApi(data)
      // console.log(data)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      // console.log(message)
      getMemberList()
      onClose()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div className="w-full">
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
      }
    </>

  )
}

// 刪除成員
export function DeleteMemberModal ({ onClose, memberId, memberName }) {
  const [isLoading, setIsLoading] = useState(false)
  const { getMemberList } = useGroupData()
  const onSubmitDelete = async () => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await delMemberApi(memberId)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      // console.log(message)
      getMemberList()
      onClose()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <div className="w-full">
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
      }
    </>

  )
}
