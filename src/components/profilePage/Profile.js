import ProfileTab from './ProfileTab'
import ProfileUser from './ProfileUser'
import SideNav from '../SideNav'

export default function Profile () {
  return (
    <div
      className="viewContainer">
      <div className='hidden md:block relative'>
        <SideNav />
      </div>
      <div className='md:hidden'>
        <ProfileUser />
        <ProfileTab />
      </div>
    </div>
  )
}
