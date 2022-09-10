import userImg from '../image/userImg.svg'
import {
  BorderColorOutlined
}
  from '@mui/icons-material'

export default function ProfileUser () {
  return (
        <div
            className="flex justify-center items-center gap-5 mb-8 mt-14 md:justify-start">
            <img
                className="rounded-full border card-shadow"
                src={userImg}
                alt="userImg"
            />
            <div
                className="flex flex-col gap-3 items-center">
                <p
                    className="font-bold">
                    Candice Wu
                </p>
                <div className="flex items-center justify-center text-gray-400 text-xs gap-2 cursor-pointer">
                    <BorderColorOutlined sx={{ fontSize: 14 }} />
                    編輯頭像
                </div>
            </div>
        </div>
  )
}
