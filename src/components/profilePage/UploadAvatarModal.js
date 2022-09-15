import { useState } from 'react'
import { useUserData } from '../../context/context'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { uploadAvatarApi } from '../../utils/api'

export default function UploadAvatarModal ({ Open, onClose }) {
  const { setUserData } = useUserData()

  const [image, setImage] = useState({ preview: '', raw: '' })

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      })
    }
  }

  const handleUpload = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image.raw)

    // const res = await uploadAvatarApi()

    const res = await fetch('https://easysplit.rocket-coding.com/api/User/UploadAvatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })

    setUserData(userData => ({
      ...userData,
      image: formData.image
    }))

    console.log(res)
  }

  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   defaultValues: {
  //     image: ''
  //   }
  // })

  return (
    <>
      <h4 className="modalTitle">修改大頭貼</h4>
      <form className="w-full relative text-center">
        <label
          htmlFor="fileUpload"
          // width="120px" height="120px"
          className="inline-block box-border border border-color-white rounded-full bg-gray-300  drop-shadow-[2px_2px_5px_rgba(0,0,0,0.25)] shadow-inner
                      hover:cursor-pointer"
        >
          {image.preview
            ? (
              <img src={image.preview} alt="avatar" class="object-cover" width="120px" height="120px"/>
              )
            : (
              <div className="px-12 py-12">
                <AddPhotoAlternateOutlinedIcon class="w-6 h-6" color="white" />
              </div>
              )}
        </label>
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          onChange={handleChange}
        // {...register('file', {
        //   required: {
        //     value: true,
        //     message: '請選擇圖片'
        //   }
        // })}
        />
        <p className="modalHint">圖片檔案須為 1 MB 以下</p>
        {/* <p className="text-xs mb-2 text-rose-600">{errors.AccountMail?.message}</p> */}
        <div class="flex gap-4">
          <button type="submit" className="btn-outline  w-1/2" onClick={onClose}>
            取消
          </button>
          <button type="submit" className="btn-primary w-1/2" onClick={handleUpload}>
            儲存
          </button>
        </div>
      </form>

    </>
  )
}