import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {Component} from 'react'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const resultConstants = {
  won: 'YOU WON',
  loss: 'YOU LOSE',
  draw: 'IT IS DRAW',
}

class App extends Component {
  state = {score: 0, selectedChoiceId: '', randomChoiceId: '', gameResult: ''}

  getGameStatus = (yourResult, randomResult) => {
    let result = ''
    if (yourResult === randomResult) {
      result = resultConstants.draw
    } else if (
      yourResult.toLowerCase() === 'paper' &&
      randomResult.toLowerCase() === 'rock'
    ) {
      result = resultConstants.won
    } else if (
      yourResult.toLowerCase() === 'scissors' &&
      randomResult.toLowerCase() === 'rock'
    ) {
      result = resultConstants.loss
    } else if (
      yourResult.toLowerCase() === 'rock' &&
      randomResult.toLowerCase() === 'paper'
    ) {
      result = resultConstants.loss
    } else if (
      yourResult.toLowerCase() === 'scissors' &&
      randomResult.toLowerCase() === 'paper'
    ) {
      result = resultConstants.won
    } else if (
      yourResult.toLowerCase() === 'rock' &&
      randomResult.toLowerCase() === 'scissors'
    ) {
      result = resultConstants.won
    } else if (
      yourResult.toLowerCase() === 'paper' &&
      randomResult.toLowerCase() === 'scissors'
    ) {
      result = resultConstants.loss
    }
    return result
  }

  getGameResult = selectedChoiceId => {
    const randomNum = Math.floor(Math.random() * 3)

    const selectedChoiceDetails = choicesList.find(
      eachChoice => eachChoice.id === selectedChoiceId,
    )
    const randomChoiceDetails = choicesList[randomNum]
    const resultStatus = this.getGameStatus(
      selectedChoiceDetails.id,
      randomChoiceDetails.id,
    )
    // console.log(randomNum, randomChoiceDetails, 2, resultStatus)

    if (resultStatus === resultConstants.won) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameResult: resultStatus,
        selectedChoiceId: selectedChoiceDetails.id,
        randomChoiceId: randomChoiceDetails.id,
      }))
    } else if (resultStatus === resultConstants.loss) {
      this.setState(prevState => ({
        score: prevState.score - 1,
        gameResult: resultStatus,
        selectedChoiceId: selectedChoiceDetails.id,
        randomChoiceId: randomChoiceDetails.id,
      }))
    } else {
      this.setState({
        gameResult: resultStatus,
        selectedChoiceId: selectedChoiceDetails.id,
        randomChoiceId: randomChoiceDetails.id,
      })
    }
  }

  renderResultContainer = () => {
    const {gameResult, randomChoiceId, selectedChoiceId} = this.state
    const selectedChoiceDetails = choicesList.find(
      eachChoice => eachChoice.id === selectedChoiceId,
    )
    const randomChoiceDetails = choicesList.find(
      eachChoice => eachChoice.id === randomChoiceId,
    )
    const onClickPlayBtn = () =>
      this.setState({selectedChoiceId: '', randomChoiceId: '', gameResult: ''})

    return (
      <div className="result-container">
        <div className="choices-list-container">
          <div className="choice-item">
            <p className="player-text">YOU</p>
            <img
              className="choice-img"
              src={selectedChoiceDetails.image}
              alt="your choice"
            />
          </div>
          <div className="choice-item">
            <p className="player-text">OPPONENT</p>
            <img
              className="choice-img"
              src={randomChoiceDetails.image}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result-text">{gameResult}</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={onClickPlayBtn}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameContainer = () => (
    <ul className="choices-list-container">
      {choicesList.map(eachChoice => {
        const onClickChoiceBtn = () => this.getGameResult(eachChoice.id)
        const value = `${eachChoice.id.toLowerCase()}Button`

        return (
          <li className="choice-img">
            <button
              type="button"
              className="choice-btn"
              onClick={onClickChoiceBtn}
              data-testid={`${value}`}
            >
              <img
                className="choice-img"
                src={eachChoice.image}
                alt={`${eachChoice.id}`}
              />
            </button>
          </li>
        )
      })}
    </ul>
  )

  renderRulesContainer = () => (
    <div className="rules-card-container">
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            Rules
          </button>
        }
      >
        {close => (
          <>
            <div className="pop-up-container">
              <button
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
              <img
                className="rules-img"
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </div>
          </>
        )}
      </Popup>
    </div>
  )

  render() {
    const {score, selectedChoiceId} = this.state
    return (
      <div className="app-container">
        <div className="header-section">
          <div className="choices-container">
            <h1>
              Rock <br /> Paper <br /> Scissors
            </h1>
          </div>
          <div className="score-card-container">
            <p className="score-title heading">Score</p>
            <p className="score-text">{score}</p>
          </div>
        </div>

        {selectedChoiceId === ''
          ? this.renderGameContainer()
          : this.renderResultContainer()}

        {this.renderRulesContainer()}
      </div>
    )
  }
}

export default App
