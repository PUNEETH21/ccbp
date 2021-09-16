import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'
// import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'

import {
  NavbarAndContentContainer,
  HomeContainer,
  BannerContainer,
  BannerContentContainer,
  BannerLogo,
  BannerDescription,
  LineBreak,
  GetItNowBtn,
  BannerCloseBtn,
  HomeVideosCardContainer,
  VideosSearchContainer,
  VideosSearchInput,
  VideosSearchButton,
  LoaderContainer,
  NoVideosContainer,
  NoVideosImg,
  VideosErrorHeading,
  VideosErrorDescription,
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
  VideoChannelName,
  VideoChannelDetails,
  VideoViewsCount,
  VideoPublished,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noSearchVideos: 'NO_SEARCH_VIDEOS',
}

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
    console.log(videosInputSearch)
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
    if (response.ok) {
      const {videos} = data
      if (videos.length > 0) {
        const filteredVideos = videos.map(video => ({
          id: video.id,
          title: video.title,
          thumbnailUrl: video.thumbnail_url,
          channel: {
            name: video.channel.name,
            profileImageUrl: video.channel.profile_image_url,
          },
          viewCount: video.view_count,
          publishedAt: video.published_at,
          // publishedAt: formatDistanceToNow(new Date(video.published_at)),
        }))
        // console.log(
        //   formatDistanceToNow(new Date(filteredVideos[6].publishedAt)).replace(
        //     /[^0-9]/g,
        //     '',
        //   ),
        // )
        this.setState({
          videos: filteredVideos,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.noSearchVideos})
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderLoaderView()
      case apiStatusConstants.noSearchVideos:
        return this.renderNoSearchVideosFoundView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
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
            <HomeVideoContainer onClick={onClickVideoContainer}>
              <VideoImg src={video.thumbnailUrl} alt={video.title} />
              <VideoChannelProfileAndContentContainer>
                <ChannelProfile
                  src={video.channel.profileImageUrl}
                  alt={video.channel.name}
                />
                <VideoCardContentContainer>
                  <VideoCardTitle>{video.title}</VideoCardTitle>
                  <VideoChannelName darkTheme={darkTheme}>
                    {video.channel.name}
                  </VideoChannelName>
                  <VideoChannelDetails darkTheme={darkTheme}>
                    <VideoViewsCount>{video.viewCount} </VideoViewsCount>
                    <VideoPublished>
                      {video.publishedAt} years ago
                    </VideoPublished>
                  </VideoChannelDetails>
                </VideoCardContentContainer>
              </VideoChannelProfileAndContentContainer>
            </HomeVideoContainer>
          )
        })}
      </HomeVideosListContainer>
    )
  }

  renderLoaderView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderContainer>
  )

  renderNoSearchVideosFoundView = () => {
    console.log(2)
    return (
      <NoSearchVideosContainer>
        <NoSearchVideosImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="no videos"
        />
        <VideosErrorHeading>Oops! Something Went Wrong</VideosErrorHeading>
        <VideosErrorDescription>
          We are having some trouble to complete your request.
          <LineBreak />
          Please try again.
        </VideosErrorDescription>
        <NoVideosRetryBtn>Retry</NoVideosRetryBtn>
      </NoSearchVideosContainer>
    )
  }

  renderFailureView = () => {
    console.log(2)
    return (
      <NoVideosContainer>
        <NoVideosImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
          alt="no videos"
        />
        <VideosErrorHeading>No Search results found</VideosErrorHeading>
        <VideosErrorDescription>
          Try different key words or remove search filter
        </VideosErrorDescription>
        <NoVideosRetryBtn>Retry</NoVideosRetryBtn>
      </NoVideosContainer>
    )
  }

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
            <>
              <Header />
              <NavbarAndContentContainer>
                <Navbar />
                <HomeContainer darkTheme={darkTheme}>
                  {showBanner && (
                    <BannerContainer>
                      <BannerContentContainer>
                        <BannerLogo
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="banner logo"
                        />
                        <BannerDescription>
                          Buy Next Watch Premium prepaid plans with
                          <LineBreak />
                          <LineBreak />
                          UPI
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
                      <VideosSearchButton darkTheme={darkTheme}>
                        <HiOutlineSearch />
                      </VideosSearchButton>
                    </VideosSearchContainer>
                    {this.renderApiStatus()}
                  </HomeVideosCardContainer>
                </HomeContainer>
              </NavbarAndContentContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
