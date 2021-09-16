import {Component} from 'react'
import './index.css'

const initialState = {
  minutes: 25,
  isPaused: true,
  seconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  onClearInterval = () => {
    clearInterval(this.intervalId)
  }

  changeStatus = () => {
    const {isPaused} = this.state
    if (isPaused) {
      this.intervalId = setInterval(this.increaseTimer, 1000)
    } else {
      this.onClearInterval()
    }

    this.setState(prevState => ({
      isPaused: !prevState.isPaused,
    }))
  }

  increaseTimer = () => {
    this.setState(prevState => {
      const {minutes, seconds} = prevState
      if (seconds === 0) {
        return {
          seconds: 59,
          minutes: minutes - 1,
        }
      }
      return {
        seconds: seconds - 1,
      }
    })
  }

  getOption = () => {
    const {isPaused} = this.state
    if (isPaused) {
      return (
        <>
          <button className="button" type="button" onClick={this.changeStatus}>
            <img
              className="option-image"
              src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png "
              alt="play icon"
            />
            <p>Start</p>
          </button>
        </>
      )
    }

    return (
      <>
        <button className="button" type="button" onClick={this.changeStatus}>
          <img
            className="option-image"
            src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
            alt="pause icon"
          />
          <p>Pause</p>
        </button>
      </>
    )
  }

  increaseMinutesValue = () => {
    this.setState(prevState => {
      const {minutes} = prevState
      initialState.minutes = minutes + 1
      return {
        minutes: prevState.minutes + 1,
      }
    })
  }

  decreaseMinutesValue = () => {
    this.setState(prevState => {
      const {minutes} = prevState
      initialState.minutes = minutes - 1
      return {
        minutes: prevState.minutes - 1,
      }
    })
  }

  onClickReset = () => {
    this.onClearInterval()
    this.setState(initialState)
  }

  secondsFormat = () => {
    const {seconds} = this.state
    if (seconds < 10) {
      return '0'.concat(seconds.toString())
    }
    return seconds
  }

  render() {
    const {isPaused, minutes} = this.state
    const fixedMinutes = initialState.minutes
    return (
      <div className="container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="bottom-container">
          <div className="clock-display-container">
            <div className="display-container">
              <h1 className="timer-count">
                {minutes}:{this.secondsFormat()}
              </h1>
              <p>{isPaused ? 'Paused' : 'Running'}</p>
            </div>
          </div>

          <div className="options-container">
            <div className="options">
              {this.getOption()}

              <button
                className="button"
                type="button"
                onClick={this.onClickReset}
              >
                <img
                  className="option-image"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
            </div>

            <p>Set Timer Limit</p>
            <div className="change-timer-container">
              <button
                className="button"
                type="button"
                onClick={this.decreaseMinutesValue}
              >
                <h1>-</h1>
              </button>
              <div className="limit-container">
                <input className="input" type="text" value={fixedMinutes} />
              </div>
              <button
                className="button"
                type="button"
                onClick={this.increaseMinutesValue}
              >
                <h1>+</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
