import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrenciesList from '../CryptocurrenciesList'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'

class CryptocurrencyTracker extends Component {
  state = {isLoading: true, cryptoCurrenciesData: []}

  componentDidMount() {
    this.getCryptoCurrencies()
  }

  getCryptoCurrencies = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = data.map(eachCryptoCurrency => ({
      currencyLogo: eachCryptoCurrency.currency_logo,
      currencyName: eachCryptoCurrency.currency_name,
      euroValue: eachCryptoCurrency.euro_value,
      id: eachCryptoCurrency.id,
      usdValue: eachCryptoCurrency.usd_value,
    }))
    this.setState({isLoading: false, cryptoCurrenciesData: updatedData})
  }

  render() {
    const {isLoading, cryptoCurrenciesData} = this.state
    console.log({cryptoCurrenciesData})
    return (
      <div className="app-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <CryptocurrenciesList cryptoCurrenciesData={cryptoCurrenciesData} />
        )}
      </div>
    )
  }
}

export default CryptocurrencyTracker
