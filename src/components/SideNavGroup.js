import GroupCoverPhoto from '../image/Group_cover-photo.svg'
import { Add } from '@mui/icons-material'

export default function SideNavGroup () {
  return (
        <div className='flex flex-col'>
            <div
                className='flex items-center justify-between font-bold mb-12'>
                <h4>群組</h4>
                <div className='flex items-center gap-2 text-colors-primary cursor-pointer'>
                    <Add sx={{ fontSize: 20 }} />
                    <p>新增群組</p>
                </div>
            </div>
            <ul
                className='flex flex-col gap-5 w-full'>
                <li
                    className='ProfileSideGroup'>
                    <img
                        className='w-8'
                        src={GroupCoverPhoto}
                        alt='GroupCoverPhoto'
                    />
                    <p className='cursor-pointer'>綠島 gogogo</p>
                </li>
                <li
                    className='ProfileSideGroup'>
                    <img
                        className='w-8'
                        src={GroupCoverPhoto}
                        alt='GroupCoverPhoto'
                    />
                    <p className='cursor-pointer'>202208 嘉義三天二夜</p>
                </li>
                <li
                    className='ProfileSideGroup'>
                    <img
                        className='w-8'
                        src={GroupCoverPhoto}
                        alt='GroupCoverPhoto'
                    />
                    <p className='cursor-pointer'>Wangs family</p>
                </li>
                <li
                    className='ProfileSideGroup'>
                    <img
                        className='w-8'
                        src={GroupCoverPhoto}
                        alt='GroupCoverPhoto'
                    />
                    <p className='cursor-pointer'>北漂內湖之家</p>
                </li>
            </ul>

        </div>
  )
}
