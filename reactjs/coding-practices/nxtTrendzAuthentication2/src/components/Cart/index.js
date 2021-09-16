import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Cart = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="cart-container">
        <img
          className="cart-img"
          alt="cart"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        />
      </div>
    </>
  )
}

export default Cart
