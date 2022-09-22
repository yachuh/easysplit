import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { addMemberApi } from '../../utils/api'

export default function AddNewGroupModal ({ open, onClose }) {
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
