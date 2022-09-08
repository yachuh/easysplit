import introImg from '../image/intro-img.svg'
import introImgSm01 from '../image/intro-sm01.svg'
import introImgSm02 from '../image/intro-sm02.svg'
import introImgSm03 from '../image/intro-sm03.svg'

export default function ThinkSplit () {
  return (
        <div
            className="viewContainer flex flex-col items-center gap-10 mb-[120px] overflow-hidden">
            <h2
                className="font-bold text-center">
                你也煩惱過怎麼分帳嗎？
            </h2>
            <img
                data-aos="fade-right"
                className="max-w-full md:hidden mb-8"
                src={introImgSm01}
                alt="intro-img"
            />
            <img
                data-aos="fade-left"
                className="max-w-full md:hidden mb-8"
                src={introImgSm02}
                alt="intro-img"
            />
            <img
                data-aos="fade-right"
                className="max-w-full md:hidden mb-8"
                src={introImgSm03}
                alt="intro-img"
            />
            <img
                data-aos="fade-up"
                className="hidden md:block max-w-[95%]"
                src={introImg}
                alt="intro-img" />
        </div>
  )
}
