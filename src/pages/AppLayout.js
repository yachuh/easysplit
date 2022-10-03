import React, { useEffect, useState } from 'react'
import { getProfileApi } from '../utils/api'
import { HeaderUser } from '../components/Header'
import { FooterUser } from '../components/Footer'
import SideNav from '../components/SideNav'
import { UserDataContext } from '../context/context'
import LoadingModal from '../components/LoadingModal'

export default function AppLayout ({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({
    userId: '',
    account: '',
    name: '',
    imageUrl: ''
  })

  const getUserProfile = async () => {
    setIsLoading(true)
    try {
      const { status: isSuccess, message, userdata } = await getProfileApi()
      if (!isSuccess) {
        console.log(message)
        return
      }
      setUserData(userData => ({
        ...userData,
        userId: userdata.userId,
        account: userdata.account,
        name: userdata.name,
        imageUrl: userdata.imageUrl
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
    // console.log('userData', userData)
  }, [])

  return (
    <>
      {
        isLoading
          ? <LoadingModal />
          : <UserDataContext.Provider value={{ userData, setUserData, getUserProfile }}>
      {/* header */}
      <HeaderUser />
      {/* sideNav */}
      <div className="pb-[111px] md:pb-20 md:ProfileFitFooter-md">
        <div className="viewContainer flex ">
          <div className="w-[269px] hidden md:block relative px-2 py-10">
            <SideNav />
          </div>
          <main className="w-full md:ml-5">
            {children}
          </main>
        </div>
      </div>
      {/* footer */}
            <div className="ProfileFitFooter md:static">
        <FooterUser />
      </div>
    </UserDataContext.Provider>
      }
    </>
  )
}
