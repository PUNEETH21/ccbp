// Write your code here.
import './index.css'

const BannerCardItem = props => {
  const {bannerCardData} = props
  const {headerText, description, className} = bannerCardData
  return (
    <div className={`${className} banner-card-container`}>
      <h1 className="heading">{headerText}</h1>
      <p className="description">{description}</p>
      <button className="button" type="button">
        Show More
      </button>
    </div>
  )
}

export default BannerCardItem
