import { AttachMoney, ChevronRight } from '@mui/icons-material'
import usImgLg from '../../image/usImgLg.svg'

export default function PayBill () {
  return (
        <div className='viewContainer md:w-[60%]'>
            <h2 className='font-bold text-black text-center mb-10 md:mt-10'>您的支持，<br className='md:hidden' /> 是我們前進的動力</h2>
            <h4 className='font-bold text-black text-center mb-5'>贊助固定金額</h4>
            <div className='flex flex-col gap-4 mb-10 md:flex-row md:flex-wrap md:gap-[2%]'>
                <button className='btn-outline w-full flex justify-center text-colors-fourth font-bold md:w-[49%] md:mb-4'>
                    <div className='ml-3 mr-2'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </div>
                    <p>50 元 / 喝杯咖啡</p>
                </button>
                <button className='btn-outline w-full flex justify-center text-colors-fourth font-bold md:w-[49%] md:mb-4'>
                    <div className='ml-3 mr-2'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </div>
                    <p>100 元 / 喝星8克</p>
                </button>
                <button className='btn-outline w-full flex justify-center text-colors-fourth font-bold md:w-[49%] md:mb-4'>
                    <div className='ml-3 mr-2'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </div>
                    <p>250 元 / 吃下午茶</p>
                </button>
                <button className='btn-outline w-full flex justify-center text-colors-fourth font-bold md:w-[49%] md:mb-4'>
                    <div className='ml-3 mr-2'>
                        <AttachMoney sx={{ fontSize: 16 }} />
                    </div>
                    <p>500 元 / 吃海底撈</p>
                </button>
            </div>
            <h4 className='font-bold text-black text-center mb-5'>自由贊助不固定金額 </h4>
            <input type='text' className="inputInfo mb-10 pl-3 md:w-1/2 md:mx-auto block" placeholder="請輸入金額" />
            <button className='btn-primary flex w-full justify-center items-center gap-3 mb-10 md:w-1/2 md:mx-auto'>
                <p>還差一步，支持拆帳趣！</p>
                <ChevronRight sx={{ fontSize: 20 }} />
            </button>
            <img className='w-full mb-10 md:w-1/2 md:mx-auto' src={usImgLg} alt='usImgLg' />
        </div>
  )
}
