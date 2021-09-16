import {Component} from 'react'
import './index.css'

class LettersCalculator extends Component {
  state = {inputSearch: ''}

  onChangeInputLetters = event => {
    this.setState({inputSearch: event.target.value})
  }

  render() {
    const {inputSearch} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <div className="content-container">
            <h1 className="heading">Calculate the Letters you enter</h1>
            <label htmlFor="input" className="phrase">
              Enter the phrase
            </label>
            <input
              id="input"
              type="text"
              className="search-input"
              placeholder="Enter the phrase"
              value={inputSearch}
              onChange={this.onChangeInputLetters}
            />
            <div className="numbers-container">
              <p className="number">No.of letters: {inputSearch.length}</p>
            </div>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png"
            alt="calculater"
            className="image"
          />
        </div>
      </div>
    )
  }
}

export default LettersCalculator
