import {Component} from 'react'

import './index.css'

class NavBar extends Component {
  render() {
    const {navBarItems, activeNavBarItem, changeActiveNavBarItem} = this.props
    return (
      <navbar className="navbar-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/portfolio-profile-img.png"
          alt="profile"
        />
        <ul className="nav-list-items">
          {navBarItems.map(navBarItem => {
            const onClickNavBar = () => changeActiveNavBarItem(navBarItem.name)
            const navBarClassName =
              navBarItem.name === activeNavBarItem ? 'selected-navbar' : ''

            return (
              <li
                className={`nav-item-container ${navBarClassName}`}
                onClick={onClickNavBar}
              >
                <img className="nav-icon" src={navBarItem.iconUrl} alt="icon" />
                <p>{navBarItem.name}</p>
              </li>
            )
          })}
        </ul>
      </navbar>
    )
  }
}

export default NavBar
