import React, { useState, useEffect, useCallback } from 'react'
import { getAllNotificationApi } from '../../utils/api'
import userSettlement from '../../image/userSettlement.svg'
import LoadingModal from '../LoadingModal'

const toMonthAndDayAndTime = (time) => {
  const formatDate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
  return formatDate
}

export const Notification = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [notificationData, setNotificationData] = useState({
    notification: []
  })

  const getAllNotification = useCallback(async () => {
    setIsLoading(true)
    try {
      const { status: isSuccess, notification } = await getAllNotificationApi()
      if (!isSuccess) {
        return
      }
      setNotificationData(notificationData => ({
        ...notificationData,
        notification
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getAllNotification()
  }, [])

  return (
    <>
      {notificationData.notification?.map((notificationItem, i) => {
        const { Id, Information, CreatDate } = notificationItem
        return (
          <div key={i}>
            {
              isLoading
                ? <LoadingModal />
                : <div
                  id={Id}
                  className='flex items-center gap-4 text-base mb-4'>
                  <img
                    className='settlement-userImg w-16 h-16'
                    src={userSettlement}
                    alt='userSettlement'
                  />
                  <ul className='flex flex-col gap-1'>
                    <li className='text-black font-bold'>{Information}</li>
                    <li className='flex items-center'>
                      {toMonthAndDayAndTime(new Date(CreatDate))}
                    </li>
                  </ul>
                </div>
            }
          </div>

        )
      })
      }
    </>

  )
}
