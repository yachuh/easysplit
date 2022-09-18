import { HeaderHome } from '../components/Header'
import ScrollArrow from '../components/ScrollArrow'
import Banner from '../components/homePage/Banner'
import ThinkSplit from '../components/homePage/ThinkSplit'
import Summary from '../components/homePage/Summary'
import Feature from '../components/homePage/Feature'
import AboutUs from '../components/homePage/AboutUs'
import EnjoyEastSplit from '../components/homePage/EnjoyEastSplit'
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
