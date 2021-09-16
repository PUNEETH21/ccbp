import './index.css'

const Header = () => (
  <div className="header-section">
    <img
      className="website-logo"
      alt="website logo"
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "
    />
    <ul className="header-options-container">
      <li className="header-option">Home</li>
      <li className="header-option">Products</li>
      <li className="header-option">Cart</li>
      <button className="signout-btn" type="button">
        Sign Out
      </button>
    </ul>
  </div>
)

export default Header
