import {FaMoon} from 'react-icons/fa'
import {WiDaySunny} from 'react-icons/wi'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

import {
  HeaderContainer,
  HeaderLogo,
  HeaderOptionsContainer,
  UserProfile,
  LogoutButton,
} from './styledComponents'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, onClickTheme} = value
      const headerLogoImg = darkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('login')
      }

      return (
        <HeaderContainer darkTheme={darkTheme}>
          <HeaderLogo src={headerLogoImg} alt="header logo" />
          <HeaderOptionsContainer>
            {darkTheme ? (
              <WiDaySunny className="day-img" onClick={onClickTheme} />
            ) : (
              <FaMoon onClick={onClickTheme} />
            )}

            <UserProfile
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <LogoutButton onClick={onClickLogout} darkTheme={darkTheme}>
              Logout
            </LogoutButton>
          </HeaderOptionsContainer>
        </HeaderContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
