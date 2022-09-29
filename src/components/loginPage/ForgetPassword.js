import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { forgetPwdApi } from '../../utils/api'
import { EmailOutlined, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import { ModalResetPwd } from '../ModalFeedback'
import LoadingModal from '../../components/LoadingModal'

export default function ForgetPassword ({ Open, onClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      accountMail: ''
    }
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onSubmit = async data => {
    // console.log('form data', data)
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await forgetPwdApi(data)
      if (!isSuccess) {
        return
      }
      setIsLoading(false)
      handleOpen()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <>
            <h4 className="font-bold mb-4">忘記密碼</h4>
            <p className="mb-4">請輸入你的會員電子郵件信箱</p>
            <form className="w-full relative" onSubmit={handleSubmit(onSubmit)}>
              <div className="inputImg"><EmailOutlined sx={{ fontSize: 16 }} /></div>
              <input
                className="inputInfo mb-2"
                type="email"
                placeholder="請輸入你的會員電子郵件"
                {...register('accountMail',
                  {
                    required: {
                      value: true,
                      message: '此為必填欄位'
                    },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: '電子郵件格式有誤，請重新確認'
                    }
                  }
                )}
              />
              <p className="text-xs mb-2 text-rose-600">{errors.accountMail?.message}</p>
              <input className="btn-primary w-full mt-8" value="發送重設密碼信" type="submit" />
              <Modal open={open} onClose={handleClose} className="modalCard-bg" >
                <div onClick={(e) => e.stopPropagation()} className="modalCard">
                  <div onClick={handleClose} className="modalCancel">
                    <CloseOutlined sx={{ fontSize: 14 }} />
                  </div>
                  <ModalResetPwd open={open} onClose={handleClose} />
                </div>
              </Modal>
            </form>
          </>
      }
    </>

  )
}
