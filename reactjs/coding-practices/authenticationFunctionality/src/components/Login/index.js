import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const onClickLogin = () => {
    Cookies.set('jwt_token', 'token', {expires: 8})
    const {history} = props
    history.replace('/')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="login-container">
      <h1 className="heading">Please Login</h1>
      <button type="button" onClick={onClickLogin}>
        Login with Sample Creds
      </button>
    </div>
  )
}

export default Login
