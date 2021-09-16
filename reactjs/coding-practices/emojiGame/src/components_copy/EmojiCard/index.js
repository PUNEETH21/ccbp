import {Component} from 'react'
import './index.css'

class EmojiCard extends Component {
  //   shuffleEmojis = () => {
  //     const {id, verifyEmoji} = this.props
  //     console.log(id, 4, {id})
  //     return verifyEmoji({id})
  //   }

  render() {
    const {emojiItem, verifyEmoji} = this.props
    const {id, emojiUrl} = emojiItem
    const onClickEmojiCard = () => verifyEmoji(id)

    return (
      <li className="emoji-card" onClick={onClickEmojiCard}>
        <img className="emoji-image" src={emojiUrl} alt="emoji" />
      </li>
    )
  }
}

export default EmojiCard
