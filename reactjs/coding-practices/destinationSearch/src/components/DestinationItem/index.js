import {Component} from 'react'
import './index.css'

class DestinationSearch extends Component {
  render() {
    const {destinationItem} = this.props
    const {name, imgUrl} = destinationItem
    return (
      <li className="item-container">
        <img src={imgUrl} alt={name} className="image" />
        <p>{name}</p>
      </li>
    )
  }
}

export default DestinationSearch
