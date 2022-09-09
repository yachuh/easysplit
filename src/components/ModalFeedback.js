import React, { useState } from 'react'
import mailSend from '../image/mailSend.svg'

export const ModalFeedback = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
        <div>
            <img
                src={mailSend}
                alt="mailSend"
            />
            <h4
                className='font-bold mb-4'>
                忘記密碼
            </h4>
        </div>
  )
}
