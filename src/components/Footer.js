import { Link } from 'react-router-dom'

import {
  MoreOutlined,
  GroupAddOutlined,
  Savings,
  HelpCenterOutlined,
  SupervisedUserCircleOutlined,
  AddCircleOutline,
  AccountCircleOutlined
}
  from '@mui/icons-material'

import singleLogo from '../image/singleLogo_w.svg'

export const FooterHome = () => {
  return (
        <footer className="bg-colors-third py-5">
            <div className="viewContainer flex justify-center lg:justify-between lg:items-center lg:gap-2">
                <Link
                    className="hidden lg:block"
                    to="/">
                    <img
                        className='w-[35px]'
                        src={singleLogo}
                        alt="singleLogo"
                    />
                </Link>
                <ul
                    className="flex items-center lg:items-start text-white gap-5 lg:gap-8">
                    <li className="footer-hover">
                        <Link
                            className="footerLink"
                            to="/stillmore">
                            <div className="footerImg">
                                <MoreOutlined sx={{ fontSize: 45 }} />
                            </div>
                            <p
                                className="footerTxt">
                                <span className="hidden lg:inline-block">
                                    |&nbsp;
                                </span>
                                了解更多
                            </p>
                        </Link>
                    </li>
                    <li className="footer-hover">
                        <Link
                            className="footerLink"
                            to="/signup">
                            <div className="footerImg">
                                <GroupAddOutlined sx={{ fontSize: 45 }} />
                            </div>
                            <p
                                className="footerTxt">
                                <span className="hidden lg:inline-block">
                                    |&nbsp;
                                </span>
                                註冊會員
                            </p>
                        </Link>
                    </li>
                    <li className="footer-hover">
                        <Link
                            className="footerLink"
                            to="/">
                            <div className="footerImg">
                                <Savings sx={{ fontSize: 45 }} />
                            </div>
                            <p
                                className="footerTxt">
                                <span className="hidden lg:inline-block">
                                    |&nbsp;
                                </span>
                                支持我們
                            </p>
                        </Link>
                    </li>
                    <li className="footer-hover">
                        <Link
                            className="footerLink"
                            to="/faq">
                            <div className="footerImg">
                                <HelpCenterOutlined sx={{ fontSize: 45 }} />
                            </div>
                            <p
                                className="footerTxt">
                                <span className="hidden lg:inline-block">
                                    |&nbsp;
                                </span>
                                常見問答
                            </p>
                        </Link>
                    </li>
                    <li className="footer-hover">
                        <Link
                            className="footerLink"
                            to="/">
                            <div className="footerImg">
                                <SupervisedUserCircleOutlined sx={{ fontSize: 45 }} />
                            </div>
                            <p
                                className="footerTxt">
                                <span className="hidden lg:inline-block">
                                    |&nbsp;
                                </span>
                                隱私政策
                            </p>
                        </Link>
                    </li>
                </ul>
                <h6
                    className="hidden lg:block text-white">
                    Copyright © 2022 EasySplit All rights reserved
                </h6>
            </div>
        </footer>
  )
}

export const FooterUser = () => {
  return (
        <footer className="bg-colors-third py-5">
            <ul className="viewContainer flex items-center justify-center text-white gap-14 md:hidden">
                <li className="footer-hover hover:text-colors-fifth">
                    <Link
                        className="footerLink"
                        to="/">
                        <div className="footerImg-phone">
                            <SupervisedUserCircleOutlined sx={{ fontSize: 45 }} />
                        </div>
                        <p
                            className="footerTxt">
                            拆帳群組
                        </p>
                    </Link>
                </li>
                <li className="footer-hover hover:text-colors-fifth">
                    <Link
                        className="footerLink"
                        to="/">
                        <div className="footerImg-phone">
                            <AddCircleOutline sx={{ fontSize: 45 }} />
                        </div>
                        <p
                            className="footerTxt">
                            新增費用
                        </p>
                    </Link>
                </li>
                <li className="footer-hover hover:text-colors-fifth">
                    <Link
                        className="footerLink"
                        to="/">
                        <div className="footerImg-phone">
                            <AccountCircleOutlined sx={{ fontSize: 45 }} />
                        </div>
                        <p
                            className="footerTxt">
                            會員中心
                        </p>
                    </Link>
                </li>
            </ul>

            <div className="viewContainer hidden md:flex md:justify-between md:items-center md:gap-2">
                <Link
                    to="/">
                    <img
                        className='w-[35px]'
                        src={singleLogo}
                        alt="singleLogo"
                    />
                </Link>
                <h6
                    className="text-white">
                    Copyright © 2022 EasySplit All rights reserved
                </h6>
            </div>
        </footer>
  )
}
