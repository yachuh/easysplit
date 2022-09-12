import { useEffect, useState } from 'react'
import { HeaderUser } from '../components/Header'
import { getProfileApi } from '../utils/api'
import { UserDataContext } from '../context/context'
import { FooterUser } from '../components/Footer'
import ProfileTab from '../components/ProfileTab'
import ProfileUser from '../components/ProfileUser'
import SideNav from '../components/SideNav'

export default function ProfilePage () {
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
    <>
      <HeaderUser />
      <UserDataContext.Provider value={ { userData, setUserData } }>
        <div className='pb-[111px] md:pb-20 md:ProfileFitFooter-md'>
          <div className="viewContainer">
            <div className='hidden md:block relative'>
              <SideNav />
            </div>
            <div className='md:hidden'>
              <ProfileUser />
              <ProfileTab />
            </div>
          </div>
        </div>
      </UserDataContext.Provider>
      <div className='ProfileFitFooter'>
        <FooterUser />
      </div>
    </>
  )
}
