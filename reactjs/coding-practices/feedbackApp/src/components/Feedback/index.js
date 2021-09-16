import {Component, Fragment} from 'react'
import './index.css'

class Feedback extends Component {
  state = {isHidden: true}

  onClickButton = () => {
    this.setState({isHidden: false})
  }

  displayEmoji = emoji => {
    const {name, imageUrl} = emoji
    return (
      <li className="item-container">
        <button className="button" type="button" onClick={this.onClickButton}>
          <img className="emoji-image" src={imageUrl} alt={name} />
        </button>
        <p>name</p>
      </li>
    )
  }

  displayContent = emojis => {
    const {isHidden} = this.state
    // const {emojis, loveEmojiUrl} = feedbackData

    return (
      <>
        <h1 className="heading">
          How satisfied are you with our customer support performance?
        </h1>
        <ul className="list-items-container">
          {emojis.map(emoji => this.displayEmoji(emoji))}
        </ul>
      </>
    )
  }

  displayImageDetails = loveEmojiUrl => {
    const {isHidden} = this.state

    return (
      <>
        <img src={loveEmojiUrl} alt="loveEmoji" className="emoji-image" />
        <h1>Thank You!</h1>
        <p className="description">
          We will use your feedback to improve our customer support performance.
        </p>
      </>
    )
  }

  render() {
    const {isHidden} = this.state
    const {feedbackData} = this.props
    const {emojis, loveEmojiUrl} = feedbackData

    return (
      <div className="bg-container">
        <div className="container">
          {isHidden
            ? this.displayContent(emojis)
            : this.displayImageDetails(loveEmojiUrl)}
        </div>
      </div>
    )
  }
}

export default Feedback
