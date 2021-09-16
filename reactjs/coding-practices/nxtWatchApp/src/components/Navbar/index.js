import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import {withRouter} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

import {
  NavbarContainer,
  NavbarListItemsContainer,
  NavbarListItemContainer,
  NavLinkContent,
  ContactSection,
  ContactHeading,
  SocialMediaSection,
  SocialMediaIcon,
  ContactDescription,
} from './styledComponents'

const Navbar = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {history} = props
      const onClickHome = () => history.replace('/login')
      const onClickTrending = () => history.replace('/trending')
      const onClickGaming = () => history.replace('/gaming')
      const onClickSavedVideos = () => history.replace('/saved-videos')

      return (
        <NavbarContainer darkTheme={darkTheme}>
          <NavbarListItemsContainer>
            <NavbarListItemContainer onClick={onClickHome}>
              <AiFillHome />
              <NavLinkContent>Home</NavLinkContent>
            </NavbarListItemContainer>
            <NavbarListItemContainer onClick={onClickTrending}>
              <HiFire />
              <NavLinkContent>Trending</NavLinkContent>
            </NavbarListItemContainer>
            <NavbarListItemContainer onClick={onClickGaming}>
              <SiYoutubegaming />
              <NavLinkContent>Gaming</NavLinkContent>
            </NavbarListItemContainer>
            <NavbarListItemContainer onClick={onClickSavedVideos}>
              <CgPlayListAdd />
              <NavLinkContent>Saved videos</NavLinkContent>
            </NavbarListItemContainer>
          </NavbarListItemsContainer>
          <ContactSection>
            <ContactHeading>CONTACT US</ContactHeading>
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
