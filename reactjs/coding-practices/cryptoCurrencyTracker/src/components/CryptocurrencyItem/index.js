import './index.css'

const CryptocurrencyItem = props => {
  const {currencyData} = props
  const {currencyLogo, currencyName, euroValue, usdValue} = currencyData
  return (
    <li className="currency-item">
      <div className="currency-list-type">
        <img
          className="currency-type-img"
          alt={`${currencyName}`}
          src={currencyLogo}
        />
        <p className="value space">{currencyName}</p>
      </div>
      <div className="currency-list-type">
        <p className="value">{usdValue}</p>
        <p className="value space">{euroValue}</p>
      </div>
    </li>
  )
}

export default CryptocurrencyItem
