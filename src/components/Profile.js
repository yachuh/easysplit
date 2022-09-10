import ProfileTab from './ProfileTab'
import ProfileUser from './ProfileUser'
import ProfileSidebars from './ProfileSidebars'

export default function Profile () {
  return (
    <div
      className="viewContainer">
      <div className='hidden md:block relative'>
        <ProfileSidebars />
      </div>
      <div className='md:hidden'>
        <ProfileUser />
        <ProfileTab />
      </div>
    </div>
  )
}
