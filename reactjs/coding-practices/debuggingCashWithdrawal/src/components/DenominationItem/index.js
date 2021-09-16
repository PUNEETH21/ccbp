import './index.css'

const DenominationItem = props => {
  const {denominationItem, updateBalance} = props
  const {value} = denominationItem

  const updateBalanceAmount = () => {
    updateBalance(value)
  }

  return (
    <li className="list-item">
      <button
        className="value-button"
        type="button"
        onClick={updateBalanceAmount}
      >
        {value}
      </button>
    </li>
  )
}

export default DenominationItem
