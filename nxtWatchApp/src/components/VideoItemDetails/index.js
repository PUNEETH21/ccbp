import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
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
  VideoItemDetailsContainer,
  VideoItemDetailsCardContainer,
  LineBreak,
  VideoCardTitle,
  VideoCardCountAndOptionsContainer,
  VideoCardCountDetailsContainer,
  VideoViewsCount,
  VideoPublished,
  VideoChannelProfileAndContentContainer,
  ChannelProfile,
  VideoCardContentContainer,
  VideoItemCardChannelName,
  VideoItemCardChannelSubscribersCount,
  VideoItemCardDescription,
  VideoCardOptionsContainer,
  OptionContainer,
  IconButtonText,
  MobileVideoItemCardDescription,
} from './styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const date = new Date()

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoItemDetails: [],
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    isSavedVideo: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      const videoItemDetails = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: differenceInYears(
          date,
          new Date(data.video_details.published_at),
        ),
        description: data.video_details.description,
      }

      this.setState({
        videoItemDetails,
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
        return this.renderVideoItemDetails()
      case apiStatusConstants.failure:
        return <ErrorView tryAgain={this.getVideoItemDetails} />
      default:
        return null
    }
  }

  onClickLikedBtn = () =>
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))

  onClickDislikedBtn = () =>
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))

  changeState = savedResult => {
    const {isSavedVideo} = this.state
    if (savedResult === true && isSavedVideo === false) {
      this.setState({isSaved: true, isSavedVideo: true})
      //   console.log('state changed')
    }
  }

  renderVideoItemDetails = () => (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme, savedVideos} = value
        const {videoItemDetails, isLiked, isDisliked, isSaved} = this.state
        const savedResult = savedVideos.some(
          video => video.id === videoItemDetails.id,
        )

        this.changeState(savedResult)

        /* console.log(`after ${isSaved} ${savedResult} `) */

        const onClickSavedBtn = () => {
          const {addVideoItem, removeVideoItem} = value
          const {isSavedVideo} = this.state
          console.log(isSaved, isSavedVideo)
          if (isSaved === false && isSavedVideo === false) {
            addVideoItem(videoItemDetails)
            this.setState({isSavedVideo: true})
          } else if (isSavedVideo === true && isSaved === true) {
            removeVideoItem(videoItemDetails.id)
            this.setState({isSavedVideo: false})
          }
          this.setState(prevState => ({
            isSaved: !prevState.isSaved,
          }))
        }

        return (
          <VideoItemDetailsCardContainer
            data-testid="videoItemDetails"
            darkTheme={darkTheme}
          >
            <ReactPlayer
              url={videoItemDetails.videoUrl}
              className="player-container"
            />
            <VideoCardTitle darkTheme={darkTheme}>
              {videoItemDetails.title}
            </VideoCardTitle>
            <VideoCardCountAndOptionsContainer darkTheme={darkTheme}>
              <VideoCardCountDetailsContainer>
                <VideoViewsCount>
                  {videoItemDetails.viewCount} views
                </VideoViewsCount>
                <VideoPublished>
                  {videoItemDetails.publishedAt} years ago
                </VideoPublished>
              </VideoCardCountDetailsContainer>

              <VideoCardOptionsContainer>
                <OptionContainer isLiked={isLiked}>
                  <BiLike size="20" />
                  <IconButtonText
                    isLiked={isLiked}
                    onClick={this.onClickLikedBtn}
                  >
                    Like
                  </IconButtonText>
                </OptionContainer>
                <OptionContainer isDisliked={isDisliked}>
                  <BiDislike size="20" />
                  <IconButtonText
                    isDisliked={isDisliked}
                    onClick={this.onClickDislikedBtn}
                  >
                    Dislike
                  </IconButtonText>
                </OptionContainer>
                <OptionContainer isSaved={isSaved}>
                  <MdPlaylistAdd size="20" />
                  <IconButtonText isSaved={isSaved} onClick={onClickSavedBtn}>
                    {isSaved ? 'Saved' : 'Save'}
                  </IconButtonText>
                </OptionContainer>
              </VideoCardOptionsContainer>
            </VideoCardCountAndOptionsContainer>

            <LineBreak />

            <VideoChannelProfileAndContentContainer>
              <ChannelProfile
                src={videoItemDetails.channel.profileImageUrl}
                alt="channel logo"
              />
              <VideoCardContentContainer>
                <VideoItemCardChannelName darkTheme={darkTheme}>
                  {videoItemDetails.channel.name}
                </VideoItemCardChannelName>
                <VideoItemCardChannelSubscribersCount>
                  {videoItemDetails.channel.subscriberCount} subscribers
                </VideoItemCardChannelSubscribersCount>
                <VideoItemCardDescription>
                  {videoItemDetails.description}
                </VideoItemCardDescription>
              </VideoCardContentContainer>
            </VideoChannelProfileAndContentContainer>
            <MobileVideoItemCardDescription>
              {videoItemDetails.description}
            </MobileVideoItemCardDescription>
          </VideoItemDetailsCardContainer>
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
            <Navbar />
          </NavbarDisplayContainer>
          <VideoItemDetailsContainer>
            {this.renderApiStatus()}
          </VideoItemDetailsContainer>
        </NavbarAndContentContainer>
      </BgContainer>
    )
  }
}

export default VideoItemDetails
