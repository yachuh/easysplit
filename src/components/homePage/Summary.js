import { Link } from 'react-router-dom'

export default function Summary () {
  return (
        <div className="overflow-hidden">
            <div
                className="viewContainer block md:flex items-center justify-between gap-[10%]">
                <div
                    className="max-w-full mb-36 md:max-w-[35%] md:mb-0"
                    data-aos="fade-right">
                    <h3
                        className="font-bold mb-10">
                        一句話介紹 EasySplit
                    </h3>
                    <p
                        className="mb-10">
                        拆帳是小事，人多是大事。拆帳是小事，人多是大事。拆帳是小事，人多是大事。
                        <br />
                        &nbsp;
                        <br />
                        這邊預計有2~3行文字。
                    </p>
                    <Link to="login">
                        <button
                            className="btn-primary w-full">
                            開始拆帳
                        </button>
                    </Link>

                </div>

                <div
                    className="hidden md:block bg-circle md:w-[660px]">
                    <div
                        className="md:h-[480px]" />
                </div>
            </div>
            <div className="md:hidden bg-circle w-full">
                <div className="h-[280px]" />
                {/* <img
                        className="h-[280px]"
                        src={phoneImage}
                        alt="phoneImage" /> */}
            </div>
        </div>
  )
}
