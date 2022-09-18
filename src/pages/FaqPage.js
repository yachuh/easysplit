import { HeaderHome } from '../components/Header'
import { FooterHome } from '../components/Footer'
import Faq from '../components/faqPage/Faq'

export default function FaqPage () {
  return (
    <>
      <HeaderHome />
      <Faq />
      <div className='ProfileFitFooter'>
        <FooterHome />
      </div>

    </>
  )
}
