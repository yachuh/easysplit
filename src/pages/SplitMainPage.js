import { HeaderUser } from '../components/Header'
import { FooterUser } from '../components/Footer'
import SplitGroupHeader from '../components/SplitGroupHeader'
import SideNav from '../components/SideNav'

export default function SplitMainPage () {
  return (
        <>
            <HeaderUser />
            <div className='pb-[111px] md:pb-20 md:ProfileFitFooter-md'>
                <div className="viewContainer">
                    <div className='hidden md:block relative'>
                        <SideNav />
                    </div>
                    <div>
                      <SplitGroupHeader />
                    </div>
                </div>
            </div>
            <div className='ProfileFitFooter'>
                <FooterUser />
            </div>
        </>
  )
}
