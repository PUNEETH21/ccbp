import {HiFire} from 'react-icons/hi'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import {
  BgContainer,
  NavbarAndContentContainer,
  NavbarDisplayContainer,
  SavedVideoChannelProfileAndContentContainer,
  ChannelProfileImg,
  SavedVideosContainer,
  SavedVideosTopSection,
  IconAndTitleSection,
  SavedVideosIconSection,
  SavedVideosTitle,
  SavedVideosListContainer,
  SavedVideosCardItem,
  SavedVideosImg,
  SavedVideosContentContainer,
  SavedVideosChannelDetails,
  SavedVideosCardTitle,
  SavedVideosStatsContainer,
  SavedVideosChannelName,
  SavedVideosViewsCount,
  SavedVideosPublished,
  NoSavedVideosContainer,
  NoSavedVideoImg,
  NoSavedVideoHeading,
  NoSavedVideoDescription,
} from './styledComponents'

const activeTab = 'SAVED_VIDEOS'

const SavedVideos = props => {
  const savedVideosViewContainer = (darkTheme, savedVideos) => (
    <>
      <SavedVideosTopSection darkTheme={darkTheme}>
        <IconAndTitleSection darkTheme={darkTheme}>
          <SavedVideosIconSection darkTheme={darkTheme}>
            <HiFire size="30" color="red" />
          </SavedVideosIconSection>
          <SavedVideosTitle darkTheme={darkTheme}>
            Saved Videos
          </SavedVideosTitle>
        </IconAndTitleSection>
      </SavedVideosTopSection>
      <SavedVideosListContainer darkTheme={darkTheme}>
        {savedVideos.map(video => {
          const onClickVideo = () => {
            const {id} = video
            const {history} = props
            history.push(`/videos/${id}`)
          }

          return (
            <SavedVideosCardItem
              data-testid="savedVideos"
              onClick={onClickVideo}
            >
              <SavedVideosImg src={video.thumbnailUrl} alt="video thumbnail" />
              <SavedVideoChannelProfileAndContentContainer>
                <ChannelProfileImg
                  src={video.channel.profileImageUrl}
                  alt={video.channel.name}
                />
                <SavedVideosContentContainer>
                  <SavedVideosCardTitle darkTheme={darkTheme}>
                    {video.title}
                  </SavedVideosCardTitle>
                  <SavedVideosStatsContainer>
                    <SavedVideosChannelName darkTheme={darkTheme}>
                      {video.channel.name}
                    </SavedVideosChannelName>
                    <SavedVideosChannelDetails darkTheme={darkTheme}>
                      <SavedVideosViewsCount>
                        {video.viewCount} views
                      </SavedVideosViewsCount>
                      <SavedVideosPublished>
                        {video.publishedAt} years ago
                      </SavedVideosPublished>
                    </SavedVideosChannelDetails>
                  </SavedVideosStatsContainer>
                </SavedVideosContentContainer>
              </SavedVideoChannelProfileAndContentContainer>
            </SavedVideosCardItem>
          )
        })}
      </SavedVideosListContainer>
    </>
  )

  const noSearchVideosViewContainer = darkTheme => (
    <NoSavedVideosContainer darkTheme={darkTheme}>
      <NoSavedVideoImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <NoSavedVideoHeading>No saved videos found</NoSavedVideoHeading>
      <NoSavedVideoDescription>
        You can save your videos while watching them
      </NoSavedVideoDescription>
    </NoSavedVideosContainer>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme, savedVideos} = value
        return (
          <BgContainer>
            <Header />
            <NavbarAndContentContainer>
              <NavbarDisplayContainer>
                <Navbar activeTab={activeTab} />
              </NavbarDisplayContainer>

              <SavedVideosContainer>
                {savedVideos.length > 0
                  ? savedVideosViewContainer(darkTheme, savedVideos)
                  : noSearchVideosViewContainer(darkTheme)}
              </SavedVideosContainer>
            </NavbarAndContentContainer>
          </BgContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideos
