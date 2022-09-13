import { Link } from 'react-router-dom'
import usImgLg from '../../image/usImgLg.svg'

export default function EnjoyEastSplit () {
  return (
        <div className="viewContainer overflow-hidden flex flex-col items-center">
            <img
                data-aos="zoom-in"
                className="mb-16"
                src={usImgLg}
                alt="usImgLg"
            />
            <Link to="login">
                <button
                    className="btn-primary mb-4" data-aos="zoom-in-up">
                    開始拆帳
                </button>
            </Link>
            <p className="font-bold mb-5" data-aos="fade-up">使用拆帳趣，算錢好容易</p>
        </div>
  )
}
