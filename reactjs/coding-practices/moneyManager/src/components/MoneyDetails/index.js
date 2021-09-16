import './index.css'

const MoneyDetails = props => {
  const {income, expenses} = props
  return (
    <div className="money-details-container">
      <div className="money-details-card balance-card">
        <img
          className="note-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p className="money-title">Your Balance</p>
          <p className="money-text" testid="balanceAmount">
            Rs {income - expenses}
          </p>
        </div>
      </div>
      <div className="money-details-card income-card">
        <img
          className="note-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
        />
        <div>
          <p className="money-title">Your Income</p>
          <p className="money-text" testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="money-details-card expenses-card">
        <img
          className="note-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p className="money-title">Your Expenses</p>
          <p className="money-text" testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
