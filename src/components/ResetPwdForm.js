import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { resetPwdApi } from '../utils/api'
import { HttpsOutlined, CloseOutlined } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import { ModalPwdSuccess } from '../components/ModalFeedback'
import LoadingModal from '../components/LoadingModal'

export default function ResetPwdForm () {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      account: '',
      password: ''
    }
  })

  // const navigate = useNavigate()

  // Get the params from the URL
  const [searchParams] = useSearchParams()
  const guid = searchParams.get('guid')

  const onSubmit = async data => {
    // console.log('form data', data)
    const payload = {
      newPassword: data.password,
      confirmPassword: data.passwordConfirmation,
      guid
    }
    setIsLoading(true)
    try {
      const { status: isSuccess, message } = await resetPwdApi(payload)
      if (!isSuccess) {
        // alert(message)
        return
      }
      // console.log(message)
      handleOpen()
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
          : <>
            <div className="viewContainer flex justify-center gap-16 mb-10 lg:mb-0">
              <div className="hidden lg:block lg:group_beforeImg lg:mt-20" />
              <div className="formCard card-shadow">
                <h3 className="font-bold text-center mb-10">重設密碼</h3>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                  {/* 密碼 */}
                  <label className="labelTitle" htmlFor="password">請輸入新密碼</label>
                  <div className="relative">
                    <div className='inputImg'><HttpsOutlined sx={{ fontSize: 16 }} /></div>
                    <input
                      id="password"
                      className="inputInfo mb-2"
                      type="password"
                      placeholder="請輸入 6 位以上英文數字符號"
                      {...register('password', {
                        required: {
                          value: true,
                          message: '此為必填欄位'
                        },
                        minLength: {
                          value: 6,
                          message: '密碼長度至少6位字元'
                        }
                      })}
                    />
                    <p className="text-xs mb-2 text-rose-600">{errors.password?.message}</p>
                  </div>
                  {/* 再次輸入密碼 */}
                  <label className="labelTitle mt-11" htmlFor="password">請再輸入一次新密碼</label>
                  <div className="relative">
                    <div className="inputImg"><HttpsOutlined sx={{ fontSize: 16 }} /></div>
                    <input
                      id="password"
                      className="inputInfo mb-2"
                      type="password"
                      placeholder="請再次輸入新密碼"
                      {...register('passwordConfirmation', {
                        required: {
                          value: true,
                          message: '此為必填欄位'
                        },
                        minLength: {
                          value: 6,
                          message: '密碼長度至少6位字元'
                        },
                        validate: {
                          matchesPreviousPassword: (value) => {
                            const { password } = getValues()
                            return password === value || '兩次輸入密碼不相同，請再次確認'
                          }
                        }
                      })}
                    />
                    <p className="text-xs mb-2 text-rose-600">{errors.passwordConfirmation?.message}</p>
                  </div>
                  {/* 確認 BTN */}
                  <input
                    className="btn-primary mt-14"
                    type="submit"
                    value="重設密碼"
                  />
                  {/* Reset Password Comfirmation Modal START */}
                  <Modal open={open} onClose={handleClose} className="modalCard-bg">
                    <div onClick={(e) => e.stopPropagation()} className="modalCard">
                      <div onClick={handleClose} className="modalCancel">
                        <CloseOutlined sx={{ fontSize: 14 }} />
                      </div>
                      <ModalPwdSuccess open={open} onClose={handleClose} />
                    </div>
                  </Modal>
                  {/* Reset Password Comfirmation Modal END */}
                </form>
              </div>
              <div className="hidden lg:block lg:group_afterImg lg:mt-20" />
            </div>
          </>
      }
    </>
  )
}
