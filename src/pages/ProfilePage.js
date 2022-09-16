import { getProfileApi } from '../utils/api'
import { useUserData } from '../context/context'
import AppLayout from './AppLayout'
import ProfileTab from '../components/profilePage/ProfileTab'
import ProfileUser from '../components/profilePage/ProfileUser'

export default function ProfilePage () {
  const { userData, setUserData } = useUserData()

  // const getUserProfile = async () => {
  //   try {
  //     const { status: isSuccess, message, userdata } = await getProfileApi()
  //     if (!isSuccess) {
  //       console.log(message)
  //       return
  //     }
  //     setUserData(userData => ({
  //       ...userData,
  //       name: userdata.Name,
  //       account: userdata.Account,
  //       image: userdata.Image
  //     }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getUserProfile()
  // }, [])

  return (
    <AppLayout>
      <ProfileUser />
      <ProfileTab />
    </AppLayout>
  )
}
