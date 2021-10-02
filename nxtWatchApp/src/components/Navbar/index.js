import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {withRouter, Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {
  NavbarContainer,
  NavbarListItemsContainer,
  NavbarListItemContainer,
  NavLinkContent,
  ContactSection,
  ContactTitle,
  SocialMediaSection,
  SocialMediaIcon,
  ContactDescription,
} from './styledComponents'
import './index.css'

const Navbar = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {alignCenter, activeTab} = props

      return (
        <NavbarContainer alignCenter={alignCenter} darkTheme={darkTheme}>
          <NavbarListItemsContainer alignCenter={alignCenter}>
            <NavbarListItemContainer
              activeTab={activeTab === 'HOME'}
              darkTheme={darkTheme}
              alignCenter={alignCenter}
            >
              <AiFillHome
                color={activeTab === 'HOME' ? '#ff0000' : '#606060'}
              />
              <Link to="/" className="nav-link-content">
                <NavLinkContent darkTheme={darkTheme}>Home</NavLinkContent>
              </Link>
            </NavbarListItemContainer>
            <NavbarListItemContainer
              activeTab={activeTab === 'TRENDING'}
              darkTheme={darkTheme}
              alignCenter={alignCenter}
            >
              <HiFire
                color={activeTab === 'TRENDING' ? '#ff0000' : '#606060'}
              />
              <Link to="/trending" className="nav-link-content">
                <NavLinkContent darkTheme={darkTheme}>Trending</NavLinkContent>
              </Link>
              <p>{alignCenter}</p>
            </NavbarListItemContainer>
            <NavbarListItemContainer
              activeTab={activeTab === 'GAMING'}
              darkTheme={darkTheme}
              alignCenter={alignCenter}
            >
              <SiYoutubegaming
                color={activeTab === 'GAMING' ? ' #ff0000' : '#606060'}
              />
              <Link to="/gaming" className="nav-link-content">
                <NavLinkContent darkTheme={darkTheme}>Gaming</NavLinkContent>
              </Link>
            </NavbarListItemContainer>
            <NavbarListItemContainer
              activeTab={activeTab === 'SAVED_VIDEOS'}
              darkTheme={darkTheme}
              alignCenter={alignCenter}
            >
              <CgPlayListAdd
                color={activeTab === 'SAVED_VIDEOS' ? '#ff0000' : '#606060'}
              />
              <Link to="/saved-videos" className="nav-link-content">
                <NavLinkContent darkTheme={darkTheme}>
                  Saved videos
                </NavLinkContent>
              </Link>
            </NavbarListItemContainer>
          </NavbarListItemsContainer>
          <ContactSection>
            <ContactTitle>CONTACT US</ContactTitle>
            <SocialMediaSection>
              <SocialMediaIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                alt="facebook logo"
              />
              <SocialMediaIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                alt="twitter logo"
              />
              <SocialMediaIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                alt="linked in logo"
              />
            </SocialMediaSection>
            <ContactDescription>
              Enjoy! Now to see your channels and recommendations!
            </ContactDescription>
          </ContactSection>
        </NavbarContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Navbar)
