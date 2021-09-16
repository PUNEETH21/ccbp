import {Component} from 'react'
import DenominationItem from '../DenominationItem'
import './index.css'

class CashWithdrawal extends Component {
  state = {balanceAmount: 2000}

  updateBalance = amount => {
    this.setState(prevState => ({
      balanceAmount: prevState.balanceAmount - amount,
    }))
  }

  render() {
    const {balanceAmount} = this.state
    const {denominationsList} = this.props
    return (
      <div className="bg-container">
        <div className="container">
          <div className="user-details-container">
            <div className="symbol">
              <p className="symbol-text">S</p>
            </div>
            <h1 className="name">Sarah Williams</h1>
          </div>
          <div className="balance-container">
            <h1>Your Balance</h1>
            <div className="balance">
              <h1 className="amount">{balanceAmount}</h1>
              <p>In Rupees</p>
            </div>
          </div>
          <h1 className="withdraw-text">Withdraw</h1>
          <p className="choose-text">CHOOSE SUM (IN RUPEES)</p>
          <ul className="list-items-container">
            {denominationsList.map(eachItem => (
              <DenominationItem
                denominationItem={eachItem}
                key={eachItem.id}
                updateBalance={this.updateBalance}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default CashWithdrawal
