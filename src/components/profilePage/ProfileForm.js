import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { editProfileApi, resetPwdEmailApi } from '../../utils/api'
import { useUserData } from '../../context/context'
import { EmailOutlined, PermIdentityOutlined, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import { ModalResetPwd } from '../ModalFeedback'

export default function ProfileForm () {
  const { userData, setUserData } = useUserData()
  const { account, name } = userData

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name
    }
  })

  /* Update profile */
  const onSubmit = async data => {
    console.log('form data', data)
    try {
      const { status: isSuccess, message } = await editProfileApi(data.name)
      if (!isSuccess) {
        alert(message)
        return
      }
      console.log(message)
      setUserData(userData => ({
        ...userData,
        name: data.name
      }))
    } catch (error) {
      console.log(error)
    }
  }

  /* Reset Password Email */
  const onSubmitResetPwd = async () => {
    try {
      const { status: isSuccess, message } = await resetPwdEmailApi()
      if (!isSuccess) {
        alert(message)
        return
      }
      // alert(message)
      console.log(message)
      handleOpen()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col mb-10 mt-11 lg:w-1/2 lg:mx-auto lg:mt-16 2xl:w-2/5" onSubmit={handleSubmit(onSubmit)}>
      {/* 姓名 */}
      <label className="labelTitle" htmlFor="name">姓名</label>
      <div className="relative">
        <div className="inputImg">
          <PermIdentityOutlined sx={{ fontSize: 16 }} />
        </div>
        <input
          id="name"
          className="inputInfo mb-2"
          type="text"
          placeholder="站內顯示的暱稱，可隨時修改"
          // value={name}
          {...register('name', {
            required: {
              value: true,
              message: '此欄不可留空'
            }
          })}
        />
        <p className="text-xs mb-2 text-rose-600">{errors.name?.message}</p>
      </div>
      {/* Email */}
      <label className="labelTitle mt-10" htmlFor="account">電子郵件</label>
      <div className="relative">
        <div className="inputImg">
          <EmailOutlined sx={{ fontSize: 16 }} />
        </div>
        <input
          id="account"
          className="inputInfo mb-2"
          type="email"
          value={account}
          disabled="disabled"
        />
      </div>
      {/* BTNs */}
      <div className='mt-10 flex justify-between items-center gap-[5%]'>
        <div className="btn-primary w-1/2 text-center" onClick={onSubmitResetPwd}>更改密碼</div>
        {/* Reset Password Modal START */}
        <Modal open={open} onClose={handleClose} className="modalCard-bg">
          <div onClick={(e) => e.stopPropagation()} className="modalCard">
            <div onClick={handleClose} className="modalCancel"><CloseOutlined sx={{ fontSize: 14 }} /></div>
            <ModalResetPwd open={open} onClose={handleClose} account={account}/>
          </div>
        </Modal>
        {/* Reset Password Modal END */}
        <input
          className="btn-primary w-1/2"
          type="submit"
          value="儲存"
        />
      </div>
    </form>
  )
}
