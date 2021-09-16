import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <Link to="/">
        <img
          className="nav-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="desktop-container header-nav-items-container">
        <Link to="/" className="header-nav-link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="header-nav-link">
          <li>Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="desktop-container logout-desktop-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
      <div className="navbar-mobile-container">
        <Link to="/">
          <AiFillHome className="mobile-header-icon" />
        </Link>
        <Link to="/jobs">
          <BsBriefcaseFill className="mobile-header-icon" />
        </Link>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          <FiLogOut className="mobile-header-icon" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
