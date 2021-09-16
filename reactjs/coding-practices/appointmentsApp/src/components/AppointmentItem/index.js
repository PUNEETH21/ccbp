import {format} from 'date-fns'
import './index.css'

const starImg =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

const filledStarImg =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {appointmentDetails, onClickFavorite} = props
  const {id, title, date, isFavorite} = appointmentDetails
  const appliedAt = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
  const favoriteImg = isFavorite ? filledStarImg : starImg

  const onClickFavoriteIcon = () => onClickFavorite(id)

  return (
    <li className="appointment-container">
      <div className="title-section">
        <p className="appointment-title">{title}</p>
        <button
          type="button"
          className="favorite-btn"
          onClick={onClickFavoriteIcon}
          testid="star"
        >
          <img src={favoriteImg} alt="star" />
        </button>
      </div>
      <p className="applied-at">{appliedAt}</p>
    </li>
  )
}

export default AppointmentItem
