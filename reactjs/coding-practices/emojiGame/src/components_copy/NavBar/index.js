import {Component} from 'react'
import './index.css'

class NavBar extends Component {
  renderScoreDetails = () => {
    const {score, isGameOver, topScore} = this.props
    if (!isGameOver) {
      return (
        <div className="navbar-right-section">
          <p className="score">Score: {score}</p>
          <p className="score">Top Score: {topScore}</p>
        </div>
      )
    }
    return null
  }

  render() {
    return (
      <div className="navbar-section">
        <div className="navbar-left-section">
          <img
            className="navbar-img"
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="game-logo"
          />
          <h1 className="game-logo-title">Emoji Game</h1>
        </div>
        {this.renderScoreDetails()}
      </div>
    )
  }
}

export default NavBar
