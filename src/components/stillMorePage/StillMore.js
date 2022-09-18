import { Link } from 'react-router-dom'
import whoareyou from '../../image/whoareyou.svg'
import how from '../../image/how.svg'
import joinImg from '../../image/join-img.svg'

export default function StillMore () {
  return (
        <div className="viewContainer mt-10">
            <div className='mb-24 lg:flex lg:flex-col lg:items-center'>
                <div className='StillMore-titleArea text-center mb-10'>
                    <p className='text-7xl'>
                        <span className='hidden lg:inline'>&emsp;</span>
                        <span className='lg:hidden'>&ensp;</span>
                        WHO？
                    </p>
                    <h2>
                        <span className='hidden lg:inline'>&emsp;</span>
                        <span className='lg:hidden'>&ensp;</span>
                        你是誰？
                    </h2>
                </div>
                <div>
                    <img
                        className='w-full mb-5 lg:hidden'
                        src={whoareyou}
                        alt="whoareyou"
                    />
                    <ul
                        className='flex flex-col items-center gap-16 text-colors-primary font-black lg:flex-row lg:justify-between lg:gap-0'>
                        <li className='lg:order-2'>
                            <img
                                className='w-full hidden lg:block lg:min-w-[520px]'
                                src={whoareyou}
                                alt="whoareyou"
                            />
                        </li>
                        <li
                            className='flex flex-col items-center gap-4 lg:order-1'>
                            <h3>新朋友</h3>
                            <p>就是現在體驗拆帳功能吧！</p>
                            <Link to='/signup' className="btn-primary">
                                註冊會員
                            </Link>
                        </li>
                        <li
                            className='flex flex-col items-center gap-4 lg:order-3'>
                            <h3>老朋友</h3>
                            <p>讓我們直接開始吧！</p>
                            <Link to='/login' className="btn-primary">
                                登入會員
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='mb-[120px] lg:flex lg:flex-col'>
                <div
                    data-aos="fade-right"
                    className='StillMore-titleArea text-center mb-10 lg:text-left'>
                    <p className='text-7xl'>
                        <span className='lg:hidden'>&ensp;</span>
                        HOW？
                    </p>
                    <h2>如何新增群組<br className='lg:hidden' />邀請朋友？</h2>
                </div>
                <div className='font-black flex flex-col items-center lg:flex-row lg:justify-between'>
                    <div
                        data-aos="fade-right"
                        className='w-full flex flex-col items-center mb-10 lg:mb-0 lg:mt-[-15%] lg:w-[45%] xl:w-full'>
                        <h4 className='mb-7'>
                            使用左側資訊選單
                        </h4>
                        <ul className='flex flex-col gap-5'>
                            <li>1.新增一個新群組</li>
                            <li>2.加入 / 新增群組成員</li>
                            <li>3.也可以分享連結邀請朋友</li>
                            <li>4.簡單新增費用！</li>
                        </ul>
                    </div>

                    <img
                        data-aos="fade-left"
                        className='w-[90%] sm:w-4/5 md:w-[70%] lg:w-[55%] xl:w-full 2xl:w-3/4'
                        src={how}
                        alt="how"
                    />
                </div>
            </div>

            <div className='flex flex-col items-center gap-4 mb-32 lg:flex-row lg:justify-between'>
                <img
                    data-aos="fade-right"
                    className='w-full sm:w-4/5 md:w-[70%] xl:w-1/2'
                    src={joinImg}
                    alt="joinImg"
                />
                <div
                    data-aos="fade-left"
                    className='StillMore-titleArea text-center mb-10'>
                    <p className='text-7xl'>JOIN A GROUP !</p>
                    <h2 className='mb-5'>加入群組 !</h2>
                    <ul>
                        <li className='mb-4'>1. 加入分帳群組。</li>
                        <li>2.選擇你的名稱 或 新增你的名稱。</li>
                    </ul>
                </div>
            </div>

            <div>
                <div className='mb-10 lg:mb-0 lg:flex lg:items-center lg:justify-between lg:gap-[10%]'>
                    <div
                        data-aos="fade-right"
                        className='StillMore-titleArea text-center mb-10'>
                        <p className='text-7xl'>WOAH !</p>
                        <h2 className='mb-5'>AMAZING !</h2>
                        <h4 className='mb-5'>開始屬於我們的精彩輕鬆的旅程盛宴吧 !</h4>
                        <Link to="login" className="btn-primary w-full">
                            開始拆帳
                        </Link>
                    </div>

                    <div
                        className="hidden lg:block bg-circle lg:w-[660px]">
                        <div
                            className="lg:h-[480px]" />
                    </div>
                </div>
                <div className="lg:hidden bg-circle w-full">
                    <div className="h-[280px]" />
                </div>
            </div>

        </div>
  )
}
