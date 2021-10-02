import styled from 'styled-components'

export const BgContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
`

export const NavbarAndContentContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-grow: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  //   background-color: green;
  //   border: 4px solid blue;
`

export const NavbarDisplayContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

export const HomeContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  background-color: ${props => (props.darkTheme ? '#181818' : '#f9f9f9')};
`

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 100%;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 1.8;
`

export const BannerContentContainer = styled.div``

export const BannerLogo = styled.img`
  height: 35px;
`

export const BannerDescription = styled.p`
  color: #000000;
`

export const GetItNowBtn = styled.button`
  background-color: transparent;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 15px;
`

export const BannerCloseBtn = styled(GetItNowBtn)`
  border: none;
  align-self: flex-start;
  padding: 0px;
`

export const HomeVideosCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
  padding: 25px;
  //   height: 100vh;
  @media (max-width: 576px) {
    padding: 0px;
  }
`

export const VideosSearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
  max-width: 400px;
  border: 1px solid ${props => (props.darkTheme ? '#313131' : '#94a3b8')};
  background-color: ${props => (props.darkTheme ? '#212121' : '#ffffff')};
  margin-bottom: 20px;
  @media (max-width: 576px) {
    margin: 20px;
    margin-bottom: 0px;
  }
`

export const VideosSearchInput = styled.input`
  padding: 10px;
  outline: none;
  border: none;
  flex-grow: 1;
  background-color: ${props => (props.darkTheme ? '#212121' : '#ffffff')};
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`

export const VideosSearchButton = styled.button`
  padding-left: 30px;
  padding-right: 30px;
  @media (max-width: 576px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  border: none;
  align-self: stretch;
  background-color: ${props => (props.darkTheme ? '#313131' : '')};
`

export const NoVideosImg = styled.img`
  width: 50%;
  max-width: 350px;
`

export const NoVideosHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
  color: ${props => (props.darkTheme ? '#ffffff' : '#212121')};
`

export const NoVideosDescription = styled.p`
  color: ${props => (props.darkTheme ? '#475569' : '#424242')};
`

export const NoVideosRetryBtn = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
`

export const NoSearchVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
`

export const NoSearchVideosImg = styled.img`
  width: 70%;
  max-width: 350px;
`

export const HomeVideosListContainer = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`
export const HomeVideoContainer = styled.li`
  //   width: 32%;
  @media (min-width: 576px) and (max-width: 768px) {
    width: 48%;
  }
  @media (min-width: 768px) {
    width: 32%;
  }
`

export const VideoImg = styled.img`
  width: 100%;
  height: 200px;
`

export const VideoChannelProfileAndContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 8px;
  @media (max-width: 576px) {
    padding-left: 16px;
  }
`

export const ChannelProfile = styled.img`
  width: 40px;
  align-self: flex-start;
`

export const VideoCardContentContainer = styled.div`
  align-self: flex-start;
  padding-bottom: 60px;
  padding-left: 18px;
`

export const VideoCardTitle = styled.p`
  margin-top: 0px;
  line-height: 1.5;
  margin-top: 0px;
  margin-bottom: 6px;
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`

export const SavedVideosStatsContainer = styled.div`
  @media (max-width: 576px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

export const VideoChannelName = styled.p`
  margin-top: 0px;
  margin-bottom: 6px;
  color: #475569;
`

export const VideoChannelDetails = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  list-style-type: none;
  color: #475569;
`

export const VideoViewsCount = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  @media (max-width: 576px) {
    margin-top: 0px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    ::before {
      content: '•';
      padding-right: 10px;
      font-size: 25px;
      color: #475569;
    }
  }
`

export const VideoPublished = styled.li`
  display: flex;
  align-items: center;
  padding-left: 10px;
  ::before {
    content: '•';
    padding-right: 10px;
    font-size: 25px;
    color: #475569;
  }
`
