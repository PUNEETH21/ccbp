import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {
  LoginFormContainer,
  LoginFormCard,
  LoginWebsiteLogo,
  LoginInputLabel,
  LoginInput,
  LoginButton,
  LoginErrorMsg,
  ShowPasswordContainer,
  ShowPasswordInputLabel,
} from './styledComponents'

const darkLogoUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
const lightLogoUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

class LoginForm extends Component {
  state = {
    inputUsername: '',
    inputPassword: '',
    showPassword: false,
    showErrorMsg: false,
    loginErrorMsg: '',
  }

  onChangeUsername = event => this.setState({inputUsername: event.target.value})

  onChangePassword = event => this.setState({inputPassword: event.target.value})

  onClickShowPassword = () =>
    this.setState(prevState => ({showPassword: !prevState.showPassword}))

  onSubmitLogin = async event => {
    event.preventDefault()
    const {inputUsername, inputPassword} = this.state
    const userDetails = {username: inputUsername, password: inputPassword}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, loginErrorMsg: data.error_msg})
    }
  }

  render() {
    const {
      inputUsername,
      inputPassword,
      showPassword,
      showErrorMsg,
      loginErrorMsg,
    } = this.state
    const passwordType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          const logoUrl = darkTheme ? darkLogoUrl : lightLogoUrl
          return (
            <LoginFormContainer darkTheme={darkTheme}>
              <LoginFormCard
                darkTheme={darkTheme}
                type="submit"
                onSubmit={this.onSubmitLogin}
              >
                <LoginWebsiteLogo src={logoUrl} alt="login website logo" />
                <LoginInputLabel darkTheme={darkTheme} htmlFor="username">
                  USERNAME
                </LoginInputLabel>
                <LoginInput
                  id="username"
                  placeholder="Username"
                  value={inputUsername}
                  onChange={this.onChangeUsername}
                  darkTheme={darkTheme}
                />
                <LoginInputLabel darkTheme={darkTheme} htmlFor="password">
                  PASSWORD
                </LoginInputLabel>
                <LoginInput
                  id="password"
                  placeholder="Password"
                  value={inputPassword}
                  onChange={this.onChangePassword}
                  type={passwordType}
                  darkTheme={darkTheme}
                />
                <ShowPasswordContainer>
                  <LoginInput
                    type="checkbox"
                    id="Show-password-input"
                    onClick={this.onClickShowPassword}
                  />
                  <ShowPasswordInputLabel
                    darkTheme={darkTheme}
                    htmlFor="Show-password-input"
                  >
                    Show Password
                  </ShowPasswordInputLabel>
                </ShowPasswordContainer>
                <LoginButton type="submit">Login</LoginButton>
                {showErrorMsg && (
                  <LoginErrorMsg>*{loginErrorMsg}</LoginErrorMsg>
                )}
              </LoginFormCard>
            </LoginFormContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm
