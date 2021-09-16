/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {isGameOver: false, selectedEmojis: [], topScore: 0}

  verifyEmoji = id => {
    const {selectedEmojis} = this.state
    const {emojisList} = this.props
    const isDuplicateEmoji = selectedEmojis.includes(id)

    const isTopScore =
      !isDuplicateEmoji && selectedEmojis.length === emojisList.length - 1
    if (isTopScore) {
      this.setState({isGameOver: true, selectedEmojis: [...selectedEmojis, id]})
    } else if (isDuplicateEmoji) {
      this.setState({isGameOver: true})
    } else {
      this.setState({selectedEmojis: [...selectedEmojis, id]})
    }
  }

  onClickPlayAgain = () => {
    const {selectedEmojis, topScore} = this.state
    const score = selectedEmojis.length
    const bestScore = score > topScore ? score : topScore
    this.setState({isGameOver: false, selectedEmojis: [], topScore: bestScore})
  }

  renderScoreCard = () => {
    const {selectedEmojis} = this.state
    const {emojisList} = this.props
    const score = selectedEmojis.length
    const isWon = score === emojisList.length
    return (
      <WinOrLoseCard
        isWon={isWon}
        score={score}
        onClickPlayAgain={this.onClickPlayAgain}
      />
    )
  }

  renderEmojis = () => {
    const randomEmojisList = this.shuffledEmojisList()
    return (
      <ul className="emojis-container">
        {randomEmojisList.map(emojiItem => (
          <EmojiCard
            emojiItem={emojiItem}
            key={emojiItem.id}
            verifyEmoji={this.verifyEmoji}
          />
        ))}
      </ul>
    )
  }

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList
    // return emojisList.sort(() => Math.random() - 0.5)
  }

  render() {
    const {selectedEmojis, isGameOver, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          score={selectedEmojis.length}
          isGameOver={isGameOver}
          topScore={topScore}
        />
        <div className="body-container">
          {isGameOver ? this.renderScoreCard() : this.renderEmojis()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
