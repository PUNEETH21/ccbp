import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './context/ThemeContext'
import './App.css'

class App extends Component {
  state = {darkTheme: false, savedVideos: []}

  addVideoItem = videoItemDetails => {
    // console.log(`add id ${videoItemDetails.id}`)
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, videoItemDetails],
    }))
  }

  removeVideoItem = videoId => {
    // console.log(`removed id ${videoId}`)
    const {savedVideos} = this.state
    const updatedSavedVideos = savedVideos.filter(video => video.id !== videoId)
    this.setState({savedVideos: updatedSavedVideos})
  }

  onClickTheme = () =>
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))

  render() {
    const {darkTheme, savedVideos} = this.state
    return (
      <ThemeContext.Provider
        value={{
          darkTheme,
          onClickTheme: this.onClickTheme,
          savedVideos,
          addVideoItem: this.addVideoItem,
          removeVideoItem: this.removeVideoItem,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
