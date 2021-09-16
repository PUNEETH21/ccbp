import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  submitForm = async event => {
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
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <form className="login-form-card" onSubmit={this.submitForm}>
          <img
            className="login-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <label className="login-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            className="input"
            id="username"
            placeholder="Username"
            onChange={this.onChangeUsername}
            value={username}
          />
          <label className="login-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            className="input"
            id="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="login-error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default LoginForm
