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
    image: ''
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
        name: userdata.Name,
        account: userdata.Account,
        image: userdata.Image
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {/* header */}
      <HeaderUser />
      {/* sideNav */}
      <div className="pb-[111px] md:pb-20 md:ProfileFitFooter-md">
        <div className="viewContainer flex ">
          <div className="w-[269px] hidden md:block relative px-2 py-10">
            <SideNav />
          </div>
          <main className="ml-5 w-full">
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
