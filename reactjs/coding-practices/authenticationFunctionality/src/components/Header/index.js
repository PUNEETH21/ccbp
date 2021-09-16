import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <ul className="headers-container">
    <Link to="/">
      <li className="list-item">Home</li>
    </Link>
    <Link to="/about">
      <li className="list-item">About</li>
    </Link>
  </ul>
)

export default Header
