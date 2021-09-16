import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    allTransactionsList: [],
    income: 0,
    expenses: 0,
  }

  onChangeTitle = event => this.setState({title: event.target.value})

  onChangeAmount = event => this.setState({amount: event.target.value})

  onChangeType = event => this.setState({type: event.target.value})

  renderHeaderDetails = () => (
    <div className="header-details-container">
      <h1 className="header-heading">Hi, Richard</h1>
      <p className="header-description">
        Welcome back to your <span className="header-span">Money Manager</span>
      </p>
    </div>
  )

  onSubmitForm = event => {
    event.preventDefault()

    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      allTransactionsList: [...prevState.allTransactionsList, newTransaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))

    if (type === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
      }))
    } else if (type === 'EXPENSES') {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
      }))
    }
  }

  onClickDelete = id => {
    const {allTransactionsList} = this.state
    const transactionItem = allTransactionsList.filter(
      eachTransaction => eachTransaction.id === id,
    )[0]

    if (transactionItem.type === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income - parseInt(transactionItem.amount),
      }))
    } else if (transactionItem.type === 'EXPENSES') {
      this.setState(prevState => ({
        expenses: prevState.expenses - parseInt(transactionItem.amount),
      }))
    }
    this.setState(prevState => ({
      allTransactionsList: prevState.allTransactionsList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))
  }

  renderAddTransactionSection = () => {
    const {title, amount, type} = this.state

    return (
      <form className="add-transaction-section" onSubmit={this.onSubmitForm}>
        <h1 className="transaction-heading">Add Transaction</h1>
        <label htmlFor="title">TITLE</label>
        <input
          id="title"
          className="input"
          placeholder="TITLE"
          value={title}
          onChange={this.onChangeTitle}
        />
        <label htmlFor="amount">AMOUNT</label>
        <input
          id="amount"
          className="input"
          placeholder="AMOUNT"
          value={amount}
          onChange={this.onChangeAmount}
        />
        <label htmlFor="select">TYPE</label>
        <select
          id="select"
          className="input"
          value={type}
          onChange={this.onChangeType}
        >
          {transactionTypeOptions.map(eachOption => (
            <option value={eachOption.optionId}>
              {eachOption.displayText}
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    )
  }

  renderHistorySection = () => {
    const {allTransactionsList} = this.state
    return (
      <div className="history-container">
        <h1 className="heading">History</h1>

        <ul className="transaction-history-container">
          <li className="transaction-item">
            <p className="item">Title</p>
            <p className="item">Amount</p>
            <p className="item">Type</p>
          </li>
          {allTransactionsList.map(eachTransaction => (
            <TransactionItem
              key={eachTransaction.id}
              transactionDetails={eachTransaction}
              onClickDelete={this.onClickDelete}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {income, expenses} = this.state
    return (
      <div className="app-container">
        {this.renderHeaderDetails()}
        <MoneyDetails income={income} expenses={expenses} />
        <div className="transaction-and-history-container">
          {this.renderAddTransactionSection()}
          {this.renderHistorySection()}
        </div>
      </div>
    )
  }
}

export default MoneyManager
