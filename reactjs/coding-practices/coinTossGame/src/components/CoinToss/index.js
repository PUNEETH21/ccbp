import {Component} from 'react'
import './index.css'

class CoinToss extends Component {
  state = {headsCount: 0, tailsCount: 0, isHeads: true}

  tossCoin = () => {
    const tossResult = Math.floor(Math.random() * 2)
    if (tossResult === 0) {
      this.setState(prevState => ({
        headsCount: prevState.headsCount + 1,
        isHeads: true,
      }))
    } else {
      this.setState(prevState => ({
        tailsCount: prevState.tailsCount + 1,
        isHeads: false,
      }))
    }
  }

  render() {
    const {headsCount, tailsCount, isHeads} = this.state
    const imageUrl = isHeads
      ? 'https://assets.ccbp.in/frontend/react-js/heads-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/tails-img.png'

    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Coin Toss Game</h1>
          <p className="title">Heads (or) Tails</p>
          <img src={imageUrl} alt="toss result" className="image" />
          <button className="button" type="button" onClick={this.tossCoin}>
            Toss Coin
          </button>
          <div className="results-container">
            <p>Total: {headsCount + tailsCount}</p>
            <p>Heads: {headsCount}</p>
            <p>Tails: {tailsCount}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CoinToss
