import { useState } from 'react'
import { useUserData } from '../../context/context'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { uploadAvatarApi } from '../../utils/api'

export default function UploadAvatarModal ({ Open, onClose }) {
  const { userData, setUserData } = useUserData()
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

    try {
      const { status: isSuccess, message, data } = await uploadAvatarApi(formData)
      console.log(data)
      if (!isSuccess) {
        console.log(message)
        return
      }
      setUserData(userData => ({
        ...userData,
        imageUrl: data.Image // formData.image
      }))
      console.log(message)
    } catch (error) {
      console.log(error)
    }

    // const res = await fetch('https://easysplit.rocket-coding.com/api/User/UploadAvatar', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: formData
    // })
  }

  return (
    <>
      <h4 className="modalTitle">修改大頭貼</h4>
      <form className="w-full relative text-center">
        <label
          htmlFor="fileUpload"
          className="w-[120px] h-[120px] inline-block box-border border border-color-white rounded-full bg-gray-300 drop-shadow-[2px_2px_5px_rgba(0,0,0,0.25)] shadow-inner
                      hover:cursor-pointer"
        >
          {image.preview
            ? (
              <img src={image.preview} alt="avatar" className="object-cover w-[120px] h-[120px] rounded-full" />
              )
            : (
              <div className="px-12 py-12 text-white">
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
        <p className="modalHint">圖片檔案須為 1 MB 以下</p>
        <div className="flex gap-4">
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
