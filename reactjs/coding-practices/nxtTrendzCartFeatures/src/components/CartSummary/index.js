import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalItems = cartList.length
      let total = 0
      cartList.forEach(eachCart => {
        total += eachCart.quantity * eachCart.price
      })

      return (
        <div className="summary-container">
          <h1 className="total-amount-text">
            Order Total: <span className="total">Rs {total}/-</span>
          </h1>
          <p>{totalItems} Items in cart</p>
          <button type="button" className="checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
