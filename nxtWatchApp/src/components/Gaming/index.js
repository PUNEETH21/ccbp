import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import ErrorView from '../ErrorView'
import LoaderView from '../LoaderView'
import {
  BgContainer,
  NavbarAndContentContainer,
  NavbarDisplayContainer,
  GamingContainer,
  GamingTopSection,
  IconAndTitleSection,
  GamingIconSection,
  GamingTitle,
  GamingVideosListContainer,
  GamingVideoCardItem,
  GamingVideoImg,
  GamingVideoCardTitle,
  GamingVideoViewsCount,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const activeTab = 'GAMING'

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideos: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {videos} = data
      const gamingVideos = videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
      }))

      this.setState({
        gamingVideos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.success:
        return this.renderGamingVideosSuccessView()
      case apiStatusConstants.failure:
        return <ErrorView tryAgain={this.getGamingVideos} />
      default:
        return null
    }
  }

  renderGamingVideosSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        const {gamingVideos} = this.state
        return (
          <>
            <GamingTopSection darkTheme={darkTheme}>
              <IconAndTitleSection darkTheme={darkTheme}>
                <GamingIconSection darkTheme={darkTheme}>
                  <SiYoutubegaming size="30" color="red" />
                </GamingIconSection>
                <GamingTitle darkTheme={darkTheme}>Gaming</GamingTitle>
              </IconAndTitleSection>
            </GamingTopSection>
            <GamingVideosListContainer darkTheme={darkTheme}>
              {gamingVideos.map(video => {
                const onClickVideo = () => {
                  const {id} = video
                  const {history} = this.props
                  history.push(`/videos/${id}`)
                }

                return (
                  <GamingVideoCardItem onClick={onClickVideo}>
                    <GamingVideoImg
                      src={video.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <GamingVideoCardTitle darkTheme={darkTheme}>
                      {video.title}
                    </GamingVideoCardTitle>
                    <GamingVideoViewsCount darkTheme={darkTheme}>
                      {video.viewCount} Watching Worldwide
                    </GamingVideoViewsCount>
                  </GamingVideoCardItem>
                )
              })}
            </GamingVideosListContainer>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <BgContainer>
        <Header />
        <NavbarAndContentContainer>
          <NavbarDisplayContainer>
            <Navbar activeTab={activeTab} />
          </NavbarDisplayContainer>
          <GamingContainer data-testid="gaming">
            {this.renderApiStatus()}
          </GamingContainer>
        </NavbarAndContentContainer>
      </BgContainer>
    )
  }
}

export default Gaming
