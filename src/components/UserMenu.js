import { useUserData } from '../context/context'
import userImg from '../image/userImg.svg'

export const UserMenu = () => {
  const { userData, setUserData } = useUserData()
  const { name, image } = userData
  return (
        <ul
            className='hidden md:flex md:items-center md:gap-[20px]'>
            <li className='text-black capitalize font-bold'>
                {name}
            </li>
            <li>
                <img
                    className="rounded-full border card-shadow w-8"
                    src={image}
                    alt="userImg"
                />
            </li>
        </ul>
  )
}
