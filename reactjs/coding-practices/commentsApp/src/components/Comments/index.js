import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  onClickLike = id =>
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))

  onClickDelete = id =>
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))

  onChangeName = event => this.setState({name: event.target.value})

  onChangeComment = event => this.setState({comment: event.target.value})

  onClickAddComment = () => {
    const {name, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      name: '',
      comment: '',
      commentsList: [...prevState.commentsList, newComment],
    }))
  }

  renderCommentDetails = () => {
    const {commentsList} = this.state
    return (
      <ul className="comments-list-container">
        {commentsList.map(eachComment => (
          <CommentItem
            commentDetails={eachComment}
            key={eachComment.id}
            onClickLike={this.onClickLike}
            onClickDelete={this.onClickDelete}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {name, comment, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-input-container">
          <div className="text-container">
            <h1>Comments</h1>
            <p>Say something about 4.0 Technologies</p>
            <div className="input-container">
              <input
                id="name"
                className="input"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
              />
              <textarea
                id="comment"
                className="input"
                cols="40"
                rows="6"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
              />
            </div>
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickAddComment}
            >
              Add Comment
            </button>
          </div>
          <img
            className="comments-img"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="line" />
        <div className="comments-count-section">
          <div className="comments-count-container">
            <p>{commentsList.length}</p>
          </div>
          <p className="comments-count-title">Comments</p>
        </div>
        {this.renderCommentDetails()}
      </div>
    )
  }
}

export default Comments
