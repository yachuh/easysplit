import { useEffect, useState } from 'react'
import { getProfileApi } from '../utils/api'
import { HeaderUser } from '../components/Header'
import { FooterUser } from '../components/Footer'
import SideNav from '../components/SideNav'
import { UserDataContext } from '../context/context'

export default function AppLayout ({ children }) {
  const [userData, setUserData] = useState({
    name: '',
    account: '',
    imageUrl: ''
  })

  const getUserProfile = async () => {
    try {
      const { status: isSuccess, message, userdata } = await getProfileApi()
      if (!isSuccess) {
        console.log(message)
        return
      }
      setUserData(userData => ({
        ...userData,
        name: userdata.name,
        account: userdata.account,
        imageUrl: userdata.imageUrl
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
    console.log('userData', userData)
  }, [])

  return (
    <UserDataContext.Provider value={{ userData, setUserData, getUserProfile }}>
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
      <div className="ProfileFitFooter">
        <FooterUser />
      </div>
    </UserDataContext.Provider>
  )
}
