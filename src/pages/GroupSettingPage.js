import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { useGroupData } from '../context/context'
import { delGroupApi, editGroupApi } from '../utils/api'

export default function GroupSettingPage () {
  // groupData not passing -- NEED TO BE FIXED
  // const { groupData, setGropuData } = useGroupData
  // console.log('groupData from GroupSettingPage', groupData)
  const { groupId } = useParams()
  console.log('groupId from param:::', groupId)

  const [image, setImage] = useState({ preview: '', raw: '' })

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '' // groupData.groupName
    }
  })

  // setImage state after user upload file
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      })
    }
  }

  const onSubmitSave = async data => {
    console.log('form data', data)
    try {
      const { status: isSuccess, message } = await editGroupApi(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitDelete = async () => {
    try {
      const { status: isSuccess, message } = await delGroupApi(groupId)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log(message)
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="member-sm mt-[25px] md:mt-10 md:border md:border-colors-primary md:rounded-[20px]">
      <h3 className="text-2xl font-medium ">設定</h3>
      <div>
        <form className="w-full relative text-center"
          onSubmit={handleSubmit(onSubmitSave)}>
          <div>
            {/* 群組照片 */}
            <p className="text-center">群組照片</p>
            <label htmlFor="fileUpload" className="groupModalCard-coverPhoto mt-2">
              {image.preview
                ? (
                  <img src={image.preview} alt="avatar" className="groupModalCard-coverPhoto-preview" />
                  )
                : (
                  <div className="px-8 py-8 text-white">
                    <AddPhotoAlternateOutlinedIcon className="w-6 h-6" />
                  </div>
                  )}
            </label>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <p className="modalHint my-2">建議尺寸：800*800 px</p>
          </div>
          {/* 群組名稱 */}
          <div className="mt-[23px]">
            <label htmlFor="name" className="groupModalCard-form-input-title">群組名稱</label>
            <input
              id="name"
              className="groupModalCard-form-input-box"
              type="text"
              placeholder="請輸入群組名稱"
              {...register('name', {
                required: {
                  value: true,
                  message: '此欄不可留空'
                }
              })}
            />
            <p className="text-xs text-left mt-1 text-rose-600">{errors.name?.message}</p>
          </div>
          {/* 儲存 button */}
          <div className="mt-[24px]">
            <input
              type="submit"
              className="btn-primary w-full my-4"
              value="儲存"
            />
          </div>
        </form>
      </div>
      <button onClick={onSubmitDelete} className="btn-red w-full">
        刪除群組
      </button>
    </div>
  )
}
