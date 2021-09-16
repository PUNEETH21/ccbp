import {
  AboutContainer,
  AboutMobileImg,
  AboutDesktopImg,
} from './styledComponents'

const About = () => (
  <AboutContainer>
    <AboutMobileImg
      src="https://assets.ccbp.in/frontend/react-js/about-sm-img.png "
      alt="about"
    />

    <AboutDesktopImg
      src="https://assets.ccbp.in/frontend/react-js/about-lg-img.png "
      alt="about"
    />
  </AboutContainer>
)

export default About
