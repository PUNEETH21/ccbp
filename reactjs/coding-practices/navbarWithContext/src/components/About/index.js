import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import './index.css'

const lightImgUrl =
  'https://assets.ccbp.in/frontend/react-js/about-light-img.png'

const darkImgUrl = 'https://assets.ccbp.in/frontend/react-js/about-dark-img.png'

const About = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const aboutHeadingClassName = isDarkTheme ? 'light-theme' : ''
      const aboutImgUrl = isDarkTheme ? darkImgUrl : lightImgUrl
      const containerBgClassName = isDarkTheme ? 'dark-bg-theme' : ''
      return (
        <>
          <Navbar />
          <div className={`about-container ${containerBgClassName}`}>
            <img className="about-img" src={aboutImgUrl} alt="about img" />
            <h1 className={`heading ${aboutHeadingClassName}`}>About</h1>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default About
