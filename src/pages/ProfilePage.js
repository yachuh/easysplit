import { HeaderUser } from '../components/Header'
import Profile from '../components/Profile'
import { FooterUser } from '../components/Footer'

export default function ProfilePage () {
  return (
    <>
      <HeaderUser />
      <div
        className='pb-[111px] md:pb-20 md:ProfileFitFooter-md'>
        <Profile />
      </div>
      <div
        className='ProfileFitFooter'>
        <FooterUser />
      </div>
    </>
  )
}
