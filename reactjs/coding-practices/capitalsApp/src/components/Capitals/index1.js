import {Component} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

// Write your code here
class Capitals extends Component {
  state = {
    isHidden: false,
    inputValue: countryAndCapitalsList[0].capitalDisplayText,
  }

  showCapital = () => {
    const {inputValue} = this.state
    const capitalDetails = countryAndCapitalsList.filter(
      eachItem => eachItem.capitalDisplayText === inputValue,
    )
    const country = capitalDetails.map(eachItem => eachItem.country)
    return <h1>{country}</h1>
  }

  selectCountry = country => {
    this.setState({inputValue: country, isHidden: false})
  }

  onClickButton = () => {
    this.setState(prevState => ({isHidden: !prevState.isHidden}))
  }

  displayCountry = country => (
    <li className="list-item">
      <button
        className="item-button"
        type="button"
        onClick={() => this.selectCountry(country)}
      >
        {country}
      </button>
    </li>
  )

  showCountries = () => {
    const {isHidden} = this.state
    if (isHidden) {
      return (
        <ul className="list-items-container">
          {countryAndCapitalsList.map(eachItem =>
            this.displayCountry(eachItem.capitalDisplayText),
          )}
        </ul>
      )
    }

    return null
  }

  render() {
    const {inputValue} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Countries And Capitals</h1>
          <div className="text-container">
            <div className="input-container">
              <input type="text" className="input" value={inputValue} />
              <button
                className="button"
                type="button"
                onClick={this.onClickButton}
              >
                v
              </button>
            </div>
            <p>is capital of which country?</p>
          </div>
          {this.showCountries()}
          {this.showCapital()}
        </div>
      </div>
    )
  }
}

export default Capitals
