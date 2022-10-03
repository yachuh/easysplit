import { Link } from 'react-router-dom'
import HeaderUserNav from './HeaderUserNav'
import { Notifications } from '@mui/icons-material'

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
                        <Link to="/payBill">支持我們</Link>
                    </li>
                    <li
                        className="p-2 headerNav-hover">
                        <Link to="/stillmore">了解更多</Link>
                    </li>
                    <li
                        className="p-2 headerNav-hover">
                        <Link to="/faq">常見問題</Link>
                    </li>
                </ul>
                <Link to="/login">
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
            <div className='hidden md:block'>
                <HeaderUserNav />
            </div>
        </header>
  )
}
