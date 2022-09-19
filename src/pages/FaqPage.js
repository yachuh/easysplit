import { HeaderHome } from '../components/Header'
import { FooterHome } from '../components/Footer'
import Faq from '../components/faqPage/Faq'

export default function FaqPage () {
  return (
    <div className='h-screen'>
      <HeaderHome />
      <div className='h-screen lg:ProfileFitFooter-md lg:h-auto'>
        <Faq />
      </div>
      <div className='footer-sticky lg:static'>
        <FooterHome />
      </div>
    </div>
  )
}
