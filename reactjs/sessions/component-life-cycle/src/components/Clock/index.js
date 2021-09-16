import {Component} from 'react'
import './index.css'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
    console.log('Constructor called')
  }

  componentDidMount() {
    console.log('Component Did mount called')
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount called')
    clearInterval(this.timerId)
  }

  //     componentWillUnmount() {
  //     console.log('componentWillUnmount called')
  //     let count = 0
  //     const x = setInterval(() => {
  //       // whatever code
  //       if (count > 5) {
  //         clearInterval(this.timerId)
  //         clearInterval(x)
  //       }
  //       console.log(count)
  //       count += 1
  //     }, 1000)
  //   }

  tick = () => {
    this.setState({date: new Date()})
  }

  render() {
    const {date} = this.state
    console.log('render called', date)
    return (
      <div className="clock-container">
        <h1 className="heading">Clock</h1>
        <p className="time">{date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
export default Clock
