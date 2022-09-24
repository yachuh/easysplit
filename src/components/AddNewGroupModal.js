import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { addGroupApi, addGroupCoverApi } from '../utils/api'

export default function AddNewGroupModal ({ onClose }) {
  const [image, setImage] = useState({ preview: '', raw: '' })

  const navigate = useNavigate()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      fileName: ''
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

  // addGroupCoverApi：群組圖片
  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('image', image.raw)
    // if img is empty, set payload to null
    const payload = image.raw ? formData : null

    try {
      const { status: isSuccess, message, fileName } = await addGroupCoverApi(payload)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log('addGroupCoverApi:::', message)
      setValue('fileName', fileName) // 好像沒有作用
      return fileName
    } catch (error) {
      console.log(error)
    }
  }
  // addAGroupApi: 群組名稱、圖片 fileName
  const onSubmit = async (data, fileName) => {
    data.fileName = fileName
    console.log('form data', data)
    try {
      const { status: isSuccess, message, groupDetail } = await addGroupApi(data)
      const { groupId } = groupDetail
      console.log(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log('addGroupApi:::', message, `group detail:::${groupDetail}`)
      navigate(`/group/${groupId}`)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className="w-full">
            <div className="groupModalCard-title">
                <h4>新增群組</h4>
            </div>
      <form className="w-full relative text-center"
        onSubmit={handleSubmit(async (data) => {
          const fileName = await handleUpload()
          await onSubmit(data, fileName)
        })}>
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
                <div>
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

                <div className="mt-[24px]">
                    <input
                    type="submit"
                    className="btn-primary w-full"
                    value="建立"
                    />
                </div>
            </form>
        </div>
  )
}
