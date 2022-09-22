import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { addGroupApi, addGroupCoverApi } from '../utils/api'

export default function AddNewGroupModal ({ Open, onClose }) {
  const [image, setImage] = useState({ preview: '', raw: '' })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: ''
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
    console.log(image.raw.length)

    // if (!image.raw.length) {
    //   console.log('圖片為空')
    //   return
    // }

    try {
      const { status: isSuccess, message, data } = await addGroupCoverApi(formData)
      console.log(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log('照片', message)
    } catch (error) {
      console.log(error)
    }
  }
  // addAGroupApi: 群組名稱
  const onSubmit = async (data) => {
    console.log('form data', data)
    try {
      const { status: isSuccess, message } = await addGroupApi(data)
      console.log(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      console.log('群組名稱', message)
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
        onSubmit={handleSubmit((data) => {
          onSubmit(data)
          handleUpload()
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
