import {Component} from 'react'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productItemDetails: [],
    similarProducts: [],
    quantity: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }
      const updatedSimilarProducts = data.similar_products.map(eachProduct => ({
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        title: eachProduct.title,
        price: eachProduct.price,
        description: eachProduct.description,
        brand: eachProduct.brand,
        totalReviews: eachProduct.total_reviews,
        rating: eachProduct.rating,
        availability: eachProduct.availability,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        productItemDetails: updatedData,
        similarProducts: updatedSimilarProducts,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickIncrement = () =>
    this.setState(prevState => ({quantity: prevState.quantity + 1}))

  onClickDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState({quantity: quantity - 1})
    }
  }

  renderSimilarProducts = () => {
    const {similarProducts} = this.state
    return (
      <div className="similar-products-section">
        <h1>Similar Products</h1>
        <ul className="similar-products-list">
          {similarProducts.map(productItem => (
            <SimilarProductItem
              key={productItem.id}
              productItem={productItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderItemDetails = () => {
    const {productItemDetails, quantity} = this.state
    return (
      <div className="item-details-container">
        <div className="product-section">
          <img
            className="product"
            src={productItemDetails.imageUrl}
            alt="product"
          />
          <div className="product-text-section">
            <h1 className="product-title">{productItemDetails.title}</h1>
            <p className="product-price">Rs {productItemDetails.price}/-</p>
            <div className="rating-and-reviews-section">
              <div className="rating-section">
                <p>{productItemDetails.rating}</p>
                <img
                  className="star-img"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="review">
                {productItemDetails.totalReviews} Reviews
              </p>
            </div>
            <p className="product-description">
              {productItemDetails.description}
            </p>
            <p>
              <span className="high-light">Available:</span>
              {productItemDetails.availability}
            </p>
            <p>
              <span className="high-light">Brand:</span>
              {productItemDetails.brand}
            </p>
            <hr />
            <div className="quantity-section">
              <button
                type="button"
                className="quantity-controller-btn"
                testid="minus"
                onClick={this.onClickDecrement}
              >
                <BsDashSquare className="quantity-btn" />
              </button>
              <p className="quantity-text">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-btn"
                testid="plus"
                onClick={this.onClickIncrement}
              >
                <BsPlusSquare className="quantity-btn" />
              </button>
            </div>
            <button type="button" className="btn">
              Add to Cart
            </button>
          </div>
        </div>
        {this.renderSimilarProducts()}
      </div>
    )
  }

  renderLoadingView = () => (
    <div testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductNotFoundView = () => (
    <div className="product-not-found-section">
      <img
        className="product-not-found"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png "
        alt="error view"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="btn" onClick={this.redirectToProduct}>
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderAllDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderItemDetails()
      case apiStatusConstants.failure:
        return this.renderProductNotFoundView()

      case apiStatusConstants.inprogress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderAllDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
