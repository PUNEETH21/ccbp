import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class PasswordManager extends Component {
  state = {
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    inputSearch: '',
    showPasswords: false,
    websitesCredentials: [],
  }

  onChangeWebsite = event => this.setState({inputWebsite: event.target.value})

  onChangeUsername = event => this.setState({inputUsername: event.target.value})

  onChangePassword = event => this.setState({inputPassword: event.target.value})

  onChangeSearch = event => this.setState({inputSearch: event.target.value})

  onClickShowPasswords = () =>
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))

  onSubmitWebsiteCredentials = event => {
    event.preventDefault()
    const {
      inputWebsite,
      inputUsername,
      inputPassword,
      websitesCredentials,
    } = this.state

    const websiteCredentials = {
      id: uuidv4(),
      website: inputWebsite,
      username: inputUsername,
      password: inputPassword,
    }

    this.setState({
      inputWebsite: '',
      inputUsername: '',
      inputPassword: '',
      websitesCredentials: [...websitesCredentials, websiteCredentials],
    })
  }

  onClickDeleteWebsiteCredentials = websiteId => {
    const {websitesCredentials} = this.state
    const updatedWebsiteCredentials = websitesCredentials.filter(
      websiteDetails => websiteDetails.id !== websiteId,
    )
    this.setState({websitesCredentials: updatedWebsiteCredentials})
  }

  getWebsitesCredentials = () => {
    const {inputSearch, websitesCredentials} = this.state
    const searchedCredentials = websitesCredentials.filter(
      websiteDetails =>
        websiteDetails.website
          .toLowerCase()
          .includes(inputSearch.toLowerCase()) === true,
    )
    return searchedCredentials
  }

  renderCredentialListView = () => {
    const {websitesCredentials, showPasswords} = this.state
    return (
      <ul className="credentials-list-container">
        {websitesCredentials.map(websiteDetails => {
          const onClickDelete = () =>
            this.onClickDeleteWebsiteCredentials(websiteDetails.id)

          const index = Math.floor(Math.random() * 10)
          const colorClass = `color${index}`

          return (
            <li className="credential-card-container" key={websiteDetails.id}>
              <div className={`symbol-container ${colorClass}`}>
                <h1 className="website-letter">
                  {websiteDetails.website[0].toUpperCase()}
                </h1>
              </div>
              <div className="website-details">
                <p className="website-text">{websiteDetails.website}</p>
                <p className="text">{websiteDetails.username}</p>
                {showPasswords ? (
                  <p className="text">{websiteDetails.password}</p>
                ) : (
                  <p className="text">
                    <img
                      className="stars-img"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                    />
                  </p>
                )}
              </div>
              <button
                testid="delete"
                type="button"
                className="delete-btn"
                onClick={onClickDelete}
              >
                <img
                  className="delete-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                />
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderNoPasswordsView = () => (
    <div className="no-password-container">
      <img
        className="no-password-img"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p className="no-pwd-text">No Passwords</p>
    </div>
  )

  renderWebsitesCredentialsContainer = () => {
    const websitesCredentials = this.getWebsitesCredentials()
    return (
      <div className="pwd-outer-card-container">
        <div className="pwd-header-container">
          <div className="pwd-heading-and-count-container">
            <h1 className="your-passwords-heading">Your Passwords</h1>
            <p className="websites-count">{websitesCredentials.length}</p>
          </div>
          <div className="input-card-pwd-container">
            <img
              className="input-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              type="search"
              className="input-data"
              placeholder="Search"
              onChange={this.onChangeSearch}
            />
          </div>
        </div>
        <div>
          <hr className="line" />
        </div>
        <div className="search-pwd-container">
          <input
            type="checkbox"
            id="search-pwd"
            className="search-pwd"
            onChange={this.onClickShowPasswords}
          />
          <label className="search-pwd-label" htmlFor="search-pwd">
            Show Passwords
          </label>
        </div>
        {websitesCredentials.length > 0
          ? this.renderCredentialListView()
          : this.renderNoPasswordsView()}
      </div>
    )
  }

  render() {
    const {inputWebsite, inputUsername, inputPassword} = this.state

    return (
      <div className="app-container">
        <img
          className="app-logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="add-new-pwd-outer-card-container">
          <form
            className="add-new-pwd-inner-card-container"
            type="submit"
            onSubmit={this.onSubmitWebsiteCredentials}
          >
            <h1 className="new-pwd-heading">Add New Password</h1>
            <div className="input-card-container" type="submit">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="input-data"
                placeholder="Enter Website"
                value={inputWebsite}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-card-container">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="input-data"
                placeholder="Enter Username"
                value={inputUsername}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-card-container">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                className="input-data"
                placeholder="Enter Password"
                value={inputPassword}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            className="password-manager-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        {this.renderWebsitesCredentialsContainer()}
      </div>
    )
  }
}

export default PasswordManager
