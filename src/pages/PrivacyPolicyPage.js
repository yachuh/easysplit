import { HeaderHome } from '../components/Header'
import { FooterHome } from '../components/Footer'
import PrivacyPolicy from '../components/privacyPolicyPage/PrivacyPolicy'

export default function PrivacyPolicyPage () {
  return (
        <div className='h-screen'>
            <HeaderHome />
            <div className='lg:ProfileFitFooter-md lg:h-auto mb-10'>
                <PrivacyPolicy />
            </div>
            <div className='footer-sticky lg:static'>
                <FooterHome />
            </div>
        </div>
  )
}
