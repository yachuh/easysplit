import { Link } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination } from 'swiper'

import bannerLogo from '../image/bannerLogo.svg'

export default function Banner () {
  const bannerCarousel = (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true
            }}
            modules={[Autoplay, Pagination]}
            className="w-full h-full"
        >
            <SwiperSlide className="bannerCarousel01" />
            <SwiperSlide className="bannerCarousel02" />
            <SwiperSlide className="bannerCarousel03" />
            <SwiperSlide className="bannerCarousel04" />
        </Swiper>
  )

  return (
        <div
            className="h-[80vh] mb-10 relative">
            <div
                className="h-[80vh]">
                {bannerCarousel}
            </div>
            <div
                className="bg-black/50 h-[80vh] w-full flex flex-col items-center justify-center absolute top-0 z-10">
                <img
                    className="w-[280px] mb-5"
                    src={bannerLogo}
                    alt="bannerLogo"
                />
                <h4
                    className="mb-5 font-bold text-white">
                    使用拆帳趣 算錢好容易
                </h4>
                <Link to="login">
                    <button
                        className="btn-secondary">
                        開始拆帳
                    </button>
                </Link>
                <Link to="nav">
                    <button
                        className="btn-secondary bg-red-500 mt-5">
                        功能測試 Nav
                    </button>
                </Link>
                <div
                    className="swiper-pagination mb-6" />
            </div>
        </div>
  )
}
