import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isCredentialsMatch: true, errorMsg: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
      this.setState({isCredentialsMatch: true})
    } else {
      const errorMsg = data.error_msg
      this.setState({
        isCredentialsMatch: false,
        username,
        password,
        errorMsg,
      })
    }
  }

  render() {
    const {username, password, isCredentialsMatch, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <img
          className="website-login"
          alt="website login"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        />
        <div className="login-card-section">
          <img
            className="website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div>
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div>
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          {!isCredentialsMatch && <p>*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
