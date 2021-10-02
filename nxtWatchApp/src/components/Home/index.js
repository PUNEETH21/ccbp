import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'
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
  HomeContainer,
  BannerContainer,
  BannerContentContainer,
  BannerLogo,
  BannerDescription,
  GetItNowBtn,
  BannerCloseBtn,
  HomeVideosCardContainer,
  VideosSearchContainer,
  VideosSearchInput,
  VideosSearchButton,
  NoVideosHeading,
  NoVideosDescription,
  NoVideosRetryBtn,
  NoSearchVideosContainer,
  NoSearchVideosImg,
  HomeVideosListContainer,
  HomeVideoContainer,
  VideoImg,
  VideoChannelProfileAndContentContainer,
  ChannelProfile,
  VideoCardContentContainer,
  VideoCardTitle,
  SavedVideosStatsContainer,
  VideoChannelName,
  VideoChannelDetails,
  VideoViewsCount,
  VideoPublished,
} from './styledComponents'

const date = new Date()

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noSearchVideos: 'NO_SEARCH_VIDEOS',
}

const activeTab = 'HOME'

class Home extends Component {
  state = {
    showBanner: true,
    apiStatus: apiStatusConstants.initial,
    videosInputSearch: '',
    videos: [],
    darkTheme: false,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getTheme = darkThemeValue => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        if (darkThemeValue !== darkTheme) this.setState({darkTheme})
      }}
    </ThemeContext.Consumer>
  )

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {videosInputSearch} = this.state

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${videosInputSearch}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(videosInputSearch, response, data)
    if (response.ok === true && data.total > 0) {
      const filteredVideos = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: differenceInYears(date, new Date(video.published_at)),
        // publishedAt: formatDistanceToNow(new Date(video.published_at)),
      }))

      this.setState({
        videos: filteredVideos,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.ok === true && data.total === 0) {
      this.setState({apiStatus: apiStatusConstants.noSearchVideos})
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
        return this.renderHomeVideosSuccessView()
      case apiStatusConstants.noSearchVideos:
        return this.renderNoSearchVideosFoundView()
      case apiStatusConstants.failure:
        return <ErrorView tryAgain={this.getHomeVideos} />
      default:
        return null
    }
  }

  renderHomeVideosSuccessView = () => {
    const {videos, darkTheme} = this.state
    return (
      <HomeVideosListContainer>
        {videos.map(video => {
          const onClickVideoContainer = () => {
            const {history} = this.props
            history.replace(`/videos/${video.id}`)
          }

          return (
            <HomeVideoContainer
              data-testid="home"
              onClick={onClickVideoContainer}
            >
              <VideoImg src={video.thumbnailUrl} alt="video thumbnail" />
              <VideoChannelProfileAndContentContainer>
                <ChannelProfile
                  src={video.channel.profileImageUrl}
                  alt="channel logo"
                />
                <VideoCardContentContainer>
                  <VideoCardTitle darkTheme={darkTheme}>
                    {video.title}
                  </VideoCardTitle>
                  <SavedVideosStatsContainer>
                    <VideoChannelName>{video.channel.name}</VideoChannelName>
                    <VideoChannelDetails>
                      <VideoViewsCount>{video.viewCount} views</VideoViewsCount>
                      <VideoPublished>
                        {video.publishedAt} years ago
                      </VideoPublished>
                    </VideoChannelDetails>
                  </SavedVideosStatsContainer>
                </VideoCardContentContainer>
              </VideoChannelProfileAndContentContainer>
            </HomeVideoContainer>
          )
        })}
      </HomeVideosListContainer>
    )
  }

  renderNoSearchVideosFoundView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <NoSearchVideosContainer>
            <NoSearchVideosImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <NoVideosHeading darkTheme={darkTheme}>
              No Search results found
            </NoVideosHeading>
            <NoVideosDescription darkTheme={darkTheme}>
              Try different key words or remove search filter
            </NoVideosDescription>
            <NoVideosRetryBtn onClick={this.getHomeVideos}>
              Retry
            </NoVideosRetryBtn>
          </NoSearchVideosContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  onClickBannerCloseBtn = () => this.setState({showBanner: false})

  render() {
    // this.getTheme()
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          const {showBanner, videosInputSearch} = this.state
          this.state.darkTheme = darkTheme
          const onChangeVideosSearchInput = event =>
            this.setState(
              {videosInputSearch: event.target.value},
              this.getHomeVideos,
            )

          return (
            <BgContainer>
              <Header />
              <NavbarAndContentContainer>
                <NavbarDisplayContainer>
                  <Navbar activeTab={activeTab} />
                </NavbarDisplayContainer>
                <HomeContainer data-testid="home" darkTheme={darkTheme}>
                  {showBanner && (
                    <BannerContainer>
                      <BannerContentContainer>
                        <BannerLogo
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <BannerDescription>
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </BannerDescription>
                        <GetItNowBtn>GET IT NOW</GetItNowBtn>
                      </BannerContentContainer>
                      <BannerCloseBtn onClick={this.onClickBannerCloseBtn}>
                        <IoMdClose size="30" />
                      </BannerCloseBtn>
                    </BannerContainer>
                  )}
                  <HomeVideosCardContainer>
                    <VideosSearchContainer darkTheme={darkTheme}>
                      <VideosSearchInput
                        type="search"
                        placeholder="Search"
                        value={videosInputSearch}
                        onChange={onChangeVideosSearchInput}
                        darkTheme={darkTheme}
                      />
                      <VideosSearchButton
                        data-testid="searchButton"
                        darkTheme={darkTheme}
                      >
                        <HiOutlineSearch />
                      </VideosSearchButton>
                    </VideosSearchContainer>
                    {this.renderApiStatus()}
                  </HomeVideosCardContainer>
                </HomeContainer>
              </NavbarAndContentContainer>
            </BgContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
