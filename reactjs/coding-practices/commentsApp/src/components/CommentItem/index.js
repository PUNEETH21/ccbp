import {formatDistanceToNow} from 'date-fns'

import './index.css'

const likedImg =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
const likeImg =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

const CommentItem = props => {
  const {commentDetails, onClickLike, onClickDelete} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails
  const symbol = name ? name[0].toUpperCase() : ''
  const postedAt = formatDistanceToNow(date)
  const likeUrl = isLiked ? likedImg : likeImg
  const likeClassName = isLiked ? 'like-blue' : 'like-dark'

  const onClickLikeIcon = () => onClickLike(id)

  const onClickDeleteIcon = () => onClickDelete(id)

  return (
    <li className="comment-container">
      <div className="top-section">
        <div className={initialClassName}>
          <p>{symbol}</p>
        </div>
        <h1 className="name-heading">{name}</h1>
        <p className="posted-at">{postedAt}</p>
      </div>
      <p className="comment-description">{comment}</p>
      <div className="bottom-section">
        <div className="like-section">
          <img className="like-img" src={likeUrl} alt="like" />
          <button type="button" className="btn" onClick={onClickLikeIcon}>
            <p className={likeClassName}>Like</p>
          </button>
        </div>
        <button
          testid="delete"
          type="button"
          className="btn"
          onClick={onClickDeleteIcon}
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
