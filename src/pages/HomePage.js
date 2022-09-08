import { HeaderHome } from '../components/Header'
import ScrollArrow from '../components/ScrollArrow'
import Banner from '../components/Banner'
import ThinkSplit from '../components/ThinkSplit'
import Summary from '../components/Summary'
import Feature from '../components/Feature'
import AboutUs from '../components/AboutUs'
import EnjoyEastSplit from '../components/EnjoyEastSplit'
import { FooterHome } from '../components/Footer'

export default function HomePage () {
  return (
    <>
      <HeaderHome />
      <ScrollArrow />
      <Banner />
      <ThinkSplit />
      <Summary />
      <Feature />
      <AboutUs />
      <EnjoyEastSplit />
      <FooterHome />
    </>
  )
}
