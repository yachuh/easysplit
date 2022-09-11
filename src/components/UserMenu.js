import userImg from '../image/userImg.svg'

export const UserMenu = () => {
  return (
        <ul
            className='hidden md:flex md:items-center md:gap-[20px]'>
            <li className='text-black capitalize font-bold'>
                Candice Wu
            </li>
            <li>
                <img
                    className="rounded-full border card-shadow w-8"
                    src={userImg}
                    alt="userImg"
                />
            </li>
        </ul>
  )
}
