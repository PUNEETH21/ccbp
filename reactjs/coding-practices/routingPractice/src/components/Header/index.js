import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-section">
    <div className="logo-section">
      <img
        className="header-img"
        src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
        alt="wave"
      />
      <h1 className="logo-title">Wave</h1>
    </div>
    <div>
      <ul className="options-section">
        <li>
          <Link className="nav-item" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </div>
)

export default Header
