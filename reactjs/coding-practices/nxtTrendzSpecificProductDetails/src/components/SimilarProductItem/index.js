import './index.css'

const SimilarProductItem = props => {
  const {productItem} = props
  const {title, brand, imageUrl, rating, price} = productItem

  return (
    <li className="product-item-section">
      <img className="product-item-img" src={imageUrl} alt="similar product" />
      <p className="similar-product-title">{title}</p>
      <p className="similar-product-brand">by {brand}</p>
      <div className="reviews-and-ratings-section">
        <p className="price">Rs {price}/-</p>
        <div className="product-rating-section">
          <p>{rating}</p>
          <img
            className="star-img"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
