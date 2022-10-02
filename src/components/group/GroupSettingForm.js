import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGroupData } from '../../context/context'
import { editGroupApi, editGroupCoverApi } from '../../utils/api'
import Modal from '@mui/material/Modal'
import { DeleteGroupModal } from './GroupModal'
import { CloseOutlined, AddPhotoAlternateOutlined } from '@mui/icons-material'
import LoadingModal from '../../components/LoadingModal'

export default function GroupSettingForm () {
  const [isLoading, setIsLoading] = useState(false)
  const { groupData, setGroupData, getGroupData } = useGroupData()
  // console.log('groupData:::', groupData)
  const { groupId, groupName, imageUrl } = groupData

  const [image, setImage] = useState({
    preview: '',
    raw: ''
  })

  useEffect(() => {
    setImage(image => ({
      ...image,
      preview: imageUrl
    }))
  }, [])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    defaultValues: {
      id: groupId,
      name: groupName,
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

  // EditGroupCoverApi：群組圖片
  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('image', image.raw)
    // if img is empty, set payload to null
    const payload = image.raw ? formData : null
    setIsLoading(true)
    try {
      const { status: isSuccess, message, fileName } = await editGroupCoverApi(payload)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      // console.log('editGroupCoverApi:::', message, fileName)
      setValue('fileName', fileName) // 好像沒有作用
      setIsLoading(false)
      return fileName
    } catch (error) {
      console.log(error)
    }
  }

  // editGroupApi: 名稱、圖片 fileName
  const onSubmit = async (data, fileName) => {
    data.fileName = fileName
    // console.log('form data', data)
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await editGroupApi(data)
      if (!isSuccess) {
        // console.log(message)
        return
      }
      // console.log('editGroupApi:::', message)
      setGroupData(groupData => ({
        ...groupData,
        groupName: data.name
      }))
      getGroupData()
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
          : <div>
            <form className="w-full relative text-center"
                onSubmit={handleSubmit(async (data) => {
                  const fileName = await handleUpload()
                  await onSubmit(data, fileName)
                })}>
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
                                    <AddPhotoAlternateOutlined className="w-6 h-6" />
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
                        disabled={(!isDirty || !isValid) && !image.raw } // false
                    />
                </div>
            </form>
            <button onClick={handleOpen} className="btn-red w-full">
              刪除群組
            </button>
            {/* DeleteGroupModal START */}
            <Modal open={open} onClose={handleClose} className="modalCard-bg">
              <div onClick={(e) => e.stopPropagation()} className="groupModalCard">
                <div onClick={handleClose} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
                <DeleteGroupModal open={open} onClose={handleClose} />
              </div>
            </Modal>
            {/* DeleteGroupModal End */}
          </div>
      }
    </>

  )
}
