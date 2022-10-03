import { Link } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination } from 'swiper'

export default function Summary () {
  const verticalCarousel = (
    <Swiper
      direction={'vertical'}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      pagination={{
        el: '.vertica-pagination',
        clickable: true
      }}
      modules={[Autoplay, Pagination]}
      className="w-full h-full"
    >
      <SwiperSlide className="verticalCarousel01 max-w-[230px] lg:max-w-[395px] mx-auto" />
      <SwiperSlide className="verticalCarousel02 max-w-[230px] lg:max-w-[395px] mx-auto" />
      <SwiperSlide className="verticalCarousel03 max-w-[230px] lg:max-w-[395px] mx-auto" />
      <SwiperSlide className="verticalCarousel04 max-w-[230px] lg:max-w-[395px] mx-auto" />
    </Swiper>
  )

  return (
    <div className="overflow-hidden">
      <div
        className="viewContainer block lg:flex items-center justify-between gap-[10%]">
        <div
          className="max-w-full mb-24 lg:max-w-[35%] lg:mb-0"
          data-aos="fade-right">
          <h3
            className="font-bold mb-10">
            一句話介紹 EasySplit
          </h3>
          <p
            className="mb-10">
            拆帳是小事，人多是大事。拆帳是小事，人多是大事。拆帳是小事，人多是大事。
          </p>
          <Link to="login" className="btn-primary w-full">
            開始拆帳
          </Link>

        </div>

        <div className='bg-container lg:bg-circle'>
          <div className='bg-phone h-[280px] w-[345px] lg:h-[480px] lg:w-[590px] flex justify-center relative'>
            <div className='absolute top-[80px] lg:top-[140px] flex items-center justify-center'>
              <div className='w-[280px] h-[56px] rounded-[10px] lg:w-[480px] lg:h-[96px] lg:rounded-[20px] bg-white card-shadow'>
                {verticalCarousel}
              </div>
            </div>
          </div>
          <div className='mt-[20%]'>
            <div className="vertica-pagination" />
          </div>
        </div>
      </div>
      <div className='lg:hidden h-[188px] w-full bg-colors-secondary rounded-t-full mt-[-180px]' />
    </div>
  )
}
