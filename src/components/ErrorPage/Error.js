import { Link } from 'react-router-dom'
import { Home } from '@mui/icons-material'
import errorImg from '../../image/Error-img.svg'

export default function Error () {
  return (
        <div className='viewContainer md:flex md:justify-center md:items-center md:gap-20'>
            <img
                className='mb-20 mt-14 mx-auto md:mx-0'
                src={errorImg}
                alt="errorImg"
            />
            <div>
                <div className='font-black flex flex-col items-center gap-5 mb-10'>
                    <h2 className='text-black'>
                        您找的頁面不存在
                    </h2>
                    <h3 className='text-colors-primary'>
                        請嘗試以下其他方式
                    </h3>
                </div>
                <div className='btn-primary flex justify-center gap-3 mb-10'>
                    <Home />
                    <Link to="/">回首頁</Link>
                </div>
            </div>

        </div>
  )
}
