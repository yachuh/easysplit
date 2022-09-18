import { HeaderHome } from '../components/Header'
import { FooterHome } from '../components/Footer'
import StillMore from '../components/stillMorePage/StillMore'
import ScrollArrow from '../components/ScrollArrow'

export default function StillMorePage () {
  return (
    <>
      <HeaderHome />
      <ScrollArrow />
      <StillMore />
      <FooterHome />
    </>
  )
}
