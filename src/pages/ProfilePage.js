import AppLayout from './AppLayout'
import ProfileTab from '../components/profilePage/ProfileTab'
import ProfileUser from '../components/profilePage/ProfileUser'

export default function ProfilePage () {
  return (
    <AppLayout>
      <ProfileUser />
      <ProfileTab />
    </AppLayout>
  )
}
