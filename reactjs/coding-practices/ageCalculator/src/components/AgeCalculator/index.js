import {Component} from 'react'
import './index.css'

class AgeCalculator extends Component {
  state = {searchInput: '', message: ''}

  calculateAge = () => {
    const {searchInput} = this.state
    const dateOfBirth = new Date(searchInput)
    const dateOfBirthYear = dateOfBirth.getFullYear()

    const presentDate = new Date()
    const presentYear = presentDate.getFullYear()

    const diff = presentYear - dateOfBirthYear

    if (diff === 1 && searchInput.length <= 4) {
      this.setState({
        message: `You are ${diff} year old by the end of 2021`,
      })
    } else if (diff > 1 && searchInput.length <= 4) {
      this.setState({
        message: `You are ${diff} years old by the end of 2021`,
      })
    } else {
      this.setState({message: 'Enter the year that you are Born'})
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value, message: ''})
  }

  render() {
    const {searchInput, message} = this.state

    return (
      <div className="bg-container">
        <div className="container">
          <div className="text-container">
            <h1 className="heading">Age Calculator</h1>
            <input
              type="text"
              className="input"
              placeholder="Enter the year that you are Born"
              value={searchInput}
              onChange={this.onChangeInput}
            />
            <p>{message}</p>
            <button
              className="button"
              type="button"
              onClick={this.calculateAge}
            >
              Calculate
            </button>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/age-calculater-persons-img.png"
            alt="persons"
            className="persons-image"
          />
        </div>
      </div>
    )
  }
}

export default AgeCalculator
