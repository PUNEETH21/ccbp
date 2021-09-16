import Header from '../Header'
import CartListView from '../CartListView'
import cartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import './index.css'

const Cart = () => (
  <cartContext.Consumer>
    {value => {
      const {cartList} = value
      const showCartList = cartList.length === 0
      return (
        <>
          <Header />
          {showCartList ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <CartListView />
              </div>
            </div>
          )}
        </>
      )
    }}
  </cartContext.Consumer>
)
export default Cart
