import {Component} from 'react'
import './index.css'

class RandomNumberGenerator extends Component {
  state = {number: 0}

  GenerateRandomNumber = () => {
    this.setState({number: Math.ceil(Math.random() * 100)})
  }

  //     onChangeSearchInput = event => {
  //     this.setState({
  //       searchInput: event.target.value
  //     })
  //   }

  render() {
    const {number} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Random Number</h1>
          <p>Generate a random number in the range of 0 to 100</p>
          <button
            className="generate-button"
            type="button"
            onClick={this.GenerateRandomNumber}
          >
            Generate
          </button>
          <h1 className="number">{number}</h1>
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator
