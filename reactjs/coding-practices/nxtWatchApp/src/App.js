import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './context/ThemeContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {darkTheme: false}

  onClickTheme = () =>
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))

  render() {
    const {darkTheme} = this.state
    return (
      <ThemeContext.Provider
        value={{darkTheme, onClickTheme: this.onClickTheme}}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
