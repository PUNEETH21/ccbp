import styled from 'styled-components'

export const BgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
`

export const NavbarAndContentContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-grow: 1;
`

export const NavbarDisplayContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

export const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
`

export const TrendingTopSection = styled.div`
  padding: 20px;
  padding-left: 60px;
  background-color: ${props => (props.darkTheme ? '#313131' : '#ebebeb')};
  @media (max-width: 768px) {
    padding-left: 20px;
  }
`

export const IconAndTitleSection = styled.div`
  display: flex;
  align-items: center;
`

export const TrendingIconSection = styled.div`
  padding: 20px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${props => (props.darkTheme ? '#181818' : '#d7dfe9')};
`

export const TrendingTitle = styled.h1`
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`

export const TrendingVideosListContainer = styled.ul`
  list-style-type: none;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 60px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
  @media (max-width: 768px) {
    padding: 30px;
  }
  @media (max-width: 576px) {
    padding: 0px;
    padding-top: 30px;
  }
`

export const TrendingVideoCardItem = styled.li`
  display: flex;
  margin-bottom: 60px;
  @media (max-width: 576px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`

export const TrendingVideoImg = styled.img`
  width: 400px;
  height: 240px;
  @media (max-width: 950px) {
    width: 240px;
    height: 240px;
  }
  @media (max-width: 576px) {
    width: 100%;
    height: 240px;
  }
`

export const TrendingVideoChannelProfileAndContentContainer = styled.div`
  display: flex;
  @media (max-width: 576px) {
    margin-top: 20px;
  }
`

export const ChannelProfileImg = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 20px;
  @media (min-width: 576px) {
    display: none;
  }
`

export const TrendingVideoContentContainer = styled.div`
  padding-left: 20px;
  color: #475569;
`

export const TrendingVideoCardTitle = styled.h1`
  margin-top: 0px;
  line-height: 1.5;
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 20px;
  font-weight: bold;
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
`

export const TrendingVideosStatsContainer = styled.div`
  margin: 0px;
  @media (max-width: 576px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

export const TrendingVideoChannelName = styled.p`
  margin: 0px;
  @media (min-width: 668px) {
    margin-bottom: 6px;
  }
`

export const TrendingVideoChannelDetails = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  list-style-type: none;
`

export const TrendingVideoViewsCount = styled.p`
  margin: 0px;
  @media (max-width: 576px) {
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

export const TrendingVideoPublished = styled.p`
  margin: 0px;
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
