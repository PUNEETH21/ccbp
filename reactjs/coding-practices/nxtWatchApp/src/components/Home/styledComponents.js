import styled from 'styled-components'

export const NavbarAndContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  //   background-color: green;
  //   border: 4px solid blue;
`
export const HomeContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => (props.darkTheme ? '#212121' : '#f8fafc')};
  color: ${props => (props.darkTheme ? '#ffffff' : '#212121')};
`

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 100%;
  padding: 40px;
  display: flex;
  justify-content: space-between;
`

export const BannerContentContainer = styled.div``

export const BannerLogo = styled.img`
  height: 35px;
`

export const BannerDescription = styled.p`
  color: #000000;
`

export const LineBreak = styled.br``

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
  //   border: 1px solid yellow;
  padding: 25px;
  //height: 100%;
`

export const VideosSearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
  border: 1px solid ${props => (props.darkTheme ? '#313131' : '#94a3b8')};
  background-color: ${props => (props.darkTheme ? '#212121' : '#ffffff')};
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
  border: none;
  align-self: stretch;
  background-color: ${props => (props.darkTheme ? '#313131' : '')};
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

export const NoVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
`

export const NoVideosImg = styled.img`
  width: 300px;
`

export const VideosErrorHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`

export const VideosErrorDescription = styled.p`
  color: #424242;
  text-align: center;
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

export const NoSearchVideosContainer = styled(NoVideosContainer)``

export const NoSearchVideosImg = styled.img`
  width: 300px;
`

export const HomeVideosListContainer = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
`
export const HomeVideoContainer = styled.li`
  width: 32%;
`

export const VideoImg = styled.img`
  width: 100%;
`

export const VideoChannelProfileAndContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 8px;
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
`

export const VideoChannelName = styled.p`
  margin-top: 0px;
  margin-bottom: 6px;
  color: ${props => (props.darkTheme ? ' #424242' : '#475569')};
`

export const VideoChannelDetails = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  list-style-type: none;
  color: ${props => (props.darkTheme ? ' #424242' : '#475569')};
`

export const VideoViewsCount = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
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
