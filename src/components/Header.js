import { Link } from 'react-router-dom'
import {
  LogoutOutlined,
  Notifications
}
  from '@mui/icons-material'
import userImg from '../image/userImg.svg'

export const HeaderHome = () => {
  return (
        <header
            className="viewContainer flex justify-center md:justify-between items-center py-3">
            <h1>
                <Link
                    to="/"
                    className="h1-logo w-[298px] h-[46px]">
                    logo
                </Link>
            </h1>
            <div
                className="hidden md:flex items-center">
                <ul
                    className="hidden lg:flex font-bold lg:gap-10">
                    <li
                        className="p-2 headerNav-hover">
                        <Link to="/">支持我們</Link>
                    </li>
                    <li
                        className="p-2 headerNav-hover">
                        <Link to="/">了解更多</Link>
                    </li>
                    <li
                        className="p-2 headerNav-hover">
                        <Link to="/">常見問題</Link>
                    </li>
                </ul>
                <Link to="login">
                    <button
                        className="btn-primary ml-8">
                        開始拆帳
                    </button>
                </Link>
            </div>
        </header>
  )
}

export const HeaderForm = () => {
  return (
        <header
            className="viewContainer py-3">
            <h1>
                <Link
                    to="/"
                    className="h1-logo w-[298px] h-[46px] mx-auto lg:m-0">
                    logo
                </Link>
            </h1>
        </header>
  )
}

export const HeaderUser = () => {
  return (
        <header
            className="viewContainer py-3 flex justify-between items-center">
            {/* <Link
                to="/"
                className="text-colors-primary">
                <LogoutOutlined sx={{ fontSize: 30 }} />
            </Link> */}
            <h1
                className='block md:hidden'>
                <Link
                    to="/"
                    className="h1-userlogo w-[133px] h-[40px] mx-auto">
                    logo
                </Link>
            </h1>
            <h1
                className='hidden md:block'>
                <Link
                    to="/"
                    className="h1-logo w-[298px] h-[46px]">
                    logo
                </Link>
            </h1>
            <Link
                to="/"
                className="text-colors-fifth md:hidden">
                <Notifications sx={{ fontSize: 30 }} />
            </Link>
            <ul
                className='hidden md:flex md:items-center md:gap-[20px]'>
                <li>
                    Candice Wu
                </li>
                <li>
                    <img
                        className="rounded-full border card-shadow w-8"
                        src={userImg}
                        alt="userImg"
                    />
                </li>

            </ul>

        </header>
  )
}
