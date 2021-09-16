import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillHome} from 'react-icons/ai'
import {BsInfoCircleFill} from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'
import {
  NavHeader,
  WebsiteLogo,
  PopupContainer,
  Button,
  CancelButton,
  NavLinksList,
  NavLinkItem,
  NavLink,
  NavLinkContent,
} from './styledComponents'
import './index.css'

const Header = () => (
  <NavHeader>
    <Link to="/">
      <WebsiteLogo
        src="https://assets.ccbp.in/frontend/react-js/hamburger-menu-website-logo.png"
        alt="website logo"
      />
    </Link>

    <Popup
      modal
      trigger={
        <Button data-testid="hamburgerIconButton">
          <GiHamburgerMenu size="30" />
        </Button>
      }
      className="popup-content"
    >
      {close => (
        <PopupContainer>
          <CancelButton
            type="button"
            data-testid="closeButton"
            onClick={() => close()}
          >
            <IoMdClose size="30" />
          </CancelButton>
          <NavLinksList>
            <NavLinkItem>
              <NavLink to="/" onClick={() => close()}>
                <AiFillHome size="30" />
                <NavLinkContent>Home</NavLinkContent>
              </NavLink>
            </NavLinkItem>

            <NavLinkItem>
              <NavLink to="/about" onClick={() => close()}>
                <BsInfoCircleFill size="30" />
                <NavLinkContent>About</NavLinkContent>
              </NavLink>
            </NavLinkItem>
          </NavLinksList>
        </PopupContainer>
      )}
    </Popup>
  </NavHeader>
)

export default withRouter(Header)
