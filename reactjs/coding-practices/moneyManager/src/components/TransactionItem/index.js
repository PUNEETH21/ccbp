import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onClickDelete} = props
  const {id, title, amount, type} = transactionDetails

  const onClickDeleteBtn = () => onClickDelete(id)

  return (
    <li className="transaction-item">
      <p className="item">{title}</p>
      <p className="item">Rs {amount}</p>
      <p className="item">{type}</p>
      <button
        testid="delete"
        type="button"
        className="delete-btn"
        onClick={onClickDeleteBtn}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
