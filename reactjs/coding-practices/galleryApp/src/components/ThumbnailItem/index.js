import './index.css'

const ThumbnailItem = props => {
  const {itemDetails, isActive, displayImage} = props
  const {id, thumbnailUrl, thumbnailAltText} = itemDetails
  const activeImageClassName = isActive ? 'active-img' : ''
  const displayImgDetails = () => {
    displayImage(id)
  }

  return (
    <li className={`list-item ${activeImageClassName}`}>
      <button className="button" type="button" onClick={displayImgDetails}>
        <img src={thumbnailUrl} alt={thumbnailAltText} />
      </button>
    </li>
  )
}

export default ThumbnailItem
