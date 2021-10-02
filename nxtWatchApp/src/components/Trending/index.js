import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import {differenceInYears} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import ErrorView from '../ErrorView'
import LoaderView from '../LoaderView'
import {
  BgContainer,
  NavbarAndContentContainer,
  NavbarDisplayContainer,
  TrendingContainer,
  TrendingTopSection,
  IconAndTitleSection,
  TrendingIconSection,
  TrendingTitle,
  TrendingVideosListContainer,
  TrendingVideoCardItem,
  TrendingVideoImg,
  TrendingVideoChannelProfileAndContentContainer,
  ChannelProfileImg,
  TrendingVideoContentContainer,
  TrendingVideoChannelDetails,
  TrendingVideoCardTitle,
  TrendingVideosStatsContainer,
  TrendingVideoChannelName,
  TrendingVideoViewsCount,
  TrendingVideoPublished,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const date = new Date()

const activeTab = 'TRENDING'

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideos: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
      const trendingVideos = videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: differenceInYears(date, new Date(video.published_at)),
      }))

      this.setState({
        trendingVideos,
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
        return this.renderTrendingVideosSuccessView()
      case apiStatusConstants.failure:
        return <ErrorView tryAgain={this.getTrendingVideos} />
      default:
        return null
    }
  }

  renderTrendingVideosSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        const {trendingVideos} = this.state
        return (
          <>
            <TrendingTopSection data-testid="trending" darkTheme={darkTheme}>
              <IconAndTitleSection darkTheme={darkTheme}>
                <TrendingIconSection darkTheme={darkTheme}>
                  <HiFire size="30" color="red" />
                </TrendingIconSection>
                <TrendingTitle darkTheme={darkTheme}>Trending</TrendingTitle>
              </IconAndTitleSection>
            </TrendingTopSection>
            <TrendingVideosListContainer
              data-testid="trending"
              darkTheme={darkTheme}
            >
              {trendingVideos.map(video => {
                const onClickVideo = () => {
                  const {id} = video
                  const {history} = this.props
                  history.push(`/videos/${id}`)
                }

                return (
                  <TrendingVideoCardItem onClick={onClickVideo}>
                    <TrendingVideoImg
                      src={video.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <TrendingVideoChannelProfileAndContentContainer>
                      <ChannelProfileImg
                        src={video.channel.profileImageUrl}
                        alt={video.channel.name}
                      />

                      <TrendingVideoContentContainer>
                        <TrendingVideoCardTitle darkTheme={darkTheme}>
                          {video.title}
                        </TrendingVideoCardTitle>
                        <TrendingVideosStatsContainer>
                          <TrendingVideoChannelName darkTheme={darkTheme}>
                            {video.channel.name}
                          </TrendingVideoChannelName>
                          <TrendingVideoChannelDetails darkTheme={darkTheme}>
                            <TrendingVideoViewsCount>
                              {video.viewCount} views
                            </TrendingVideoViewsCount>
                            <TrendingVideoPublished>
                              {video.publishedAt} years ago
                            </TrendingVideoPublished>
                          </TrendingVideoChannelDetails>
                        </TrendingVideosStatsContainer>
                      </TrendingVideoContentContainer>
                    </TrendingVideoChannelProfileAndContentContainer>
                  </TrendingVideoCardItem>
                )
              })}
            </TrendingVideosListContainer>
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
          <TrendingContainer data-testid="trending">
            {this.renderApiStatus()}
          </TrendingContainer>
        </NavbarAndContentContainer>
      </BgContainer>
    )
  }
}

export default Trending
