import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const lightImgUrl =
  'https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png'
const darkImgUrl =
  'https://assets.ccbp.in/frontend/react-js/website-logo-dark-theme-img.png'

const lightThemeImg =
  'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
const darkThemeImg =
  'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

const Navbar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      const navbarClassName = isDarkTheme ? 'dark-bg-navbar' : ''
      const linkClassName = isDarkTheme ? 'light-text' : ''

      const logoUrl = isDarkTheme ? darkImgUrl : lightImgUrl
      const themeUrl = isDarkTheme ? lightThemeImg : darkThemeImg

      return (
        <nav className={`navbar ${navbarClassName}`}>
          <img className="logo" src={logoUrl} alt="website logo" />
          <ul className="sections">
            <li>
              <Link to="/" className={`link ${linkClassName}`}>
                <p className="section-name">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/about" className={`link ${linkClassName}`}>
                <p className="section-name">About</p>
              </Link>
            </li>
          </ul>
          <button
            testid="theme"
            className="theme-btn"
            type="button"
            onClick={toggleTheme}
          >
            <img className="logo" src={themeUrl} alt="theme" />
          </button>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default Navbar
