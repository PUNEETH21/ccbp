// Write your code here.

import './index.css'

const Card = props => {
  const {cardData} = props
  const {className, title, description, imgUrl} = cardData
  return (
    <div className={`${className} card`}>
      <h1 className="heading">{title}</h1>
      <p className="description">{description}</p>
      <div className="image-container">
        <img src={`${imgUrl}`} alt={title} />
      </div>
    </div>
  )
}

export default Card
