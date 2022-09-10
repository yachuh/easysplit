import ProfileForm from '../components/UserProfileForm'
import ProfileTab from '../components/UserProfileTab'
import userImg from '../image/userImg.svg'
import {
  BorderColorOutlined
}
  from '@mui/icons-material'

export default function UserProfile () {
  return (
    <div
      className="viewContainer">
      <div
        className="flex justify-center items-center gap-5 mb-8 mt-14">
        <img
          className="rounded-full border card-shadow"
          src={userImg}
          alt="userImg"
        />
        <div
          className="flex flex-col gap-3 items-center">
          <p
            className="font-black">
            Candice Wu
          </p>
          <div className="flex items-center justify-center text-gray-400 text-xs gap-2">
            <BorderColorOutlined sx={{ fontSize: 14 }} />
            編輯頭像
          </div>
        </div>
      </div>

      <ProfileTab />

      {/* <div className='md:flex md:justify-between'>
        <div
          className="">
          <div className=''>
            <button
              className="btn-primary w-full md:before:sideEdge-circle">
              會員資料設定
            </button>
          </div>
          <div className='w-1/2 md:w-full md:pl-6 md:border-l-2 md:py-5 md:border-gray-300 md:hover:sideEdge-hover md:relative'>
            <button
              className="btn-primary w-full md:before:sideEdge-circle">
              收付款項設定
            </button>

          </div>
          <UserProfileForm />
        </div>
      </div> */}
    </div>
  )
}
