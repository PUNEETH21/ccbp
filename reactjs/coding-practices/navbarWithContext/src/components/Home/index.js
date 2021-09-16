import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import './index.css'

const lightImgUrl =
  'https://assets.ccbp.in/frontend/react-js/home-light-img.png'

const darkImgUrl = 'https://assets.ccbp.in/frontend/react-js/home-dark-img.png'

const Home = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const homeHeadingClassName = isDarkTheme ? 'light-theme' : ''
      const homeImgUrl = isDarkTheme ? darkImgUrl : lightImgUrl
      const containerBgClassName = isDarkTheme ? 'dark-bg-theme' : ''
      return (
        <>
          <Navbar />
          <div className={`home-container ${containerBgClassName}`}>
            <img className="home-img" src={homeImgUrl} alt="home" />
            <h1 className={`heading ${homeHeadingClassName}`}>Home</h1>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default Home
