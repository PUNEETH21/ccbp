import CryptocurrencyItem from '../CryptocurrencyItem'
import './index.css'

const CryptocurrenciesList = props => {
  const {cryptoCurrenciesData} = props
  return (
    <div className="crypto-currencies-container">
      <h1>Cryptocurrency Tracker</h1>
      <img
        className="crypto-currencies-image"
        alt="Cryptocurrency Tracker"
        src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
      />
      <div className="currencies-text-container">
        <div className="header-section">
          <h1>Coin Type</h1>
          <div className="currency-type">
            <h1>USD</h1>
            <h1 className="currency-type-heading">EURO</h1>
          </div>
        </div>
        <ul className="crypto-currencies-list">
          {cryptoCurrenciesData.map(eachCurrencyItem => (
            <CryptocurrencyItem
              currencyData={eachCurrencyItem}
              key={eachCurrencyItem.id}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CryptocurrenciesList
