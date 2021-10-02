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
`

export const NavbarDisplayContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

export const SavedVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
`

export const SavedVideosTopSection = styled.div`
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

export const SavedVideosIconSection = styled.div`
  padding: 20px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${props => (props.darkTheme ? '#181818' : '#d7dfe9')};
`

export const SavedVideosTitle = styled.h1`
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
`

export const SavedVideosListContainer = styled.ul`
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

export const SavedVideosCardItem = styled.li`
  display: flex;
  margin-bottom: 60px;
  @media (max-width: 576px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`

export const SavedVideosImg = styled.img`
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

export const SavedVideoChannelProfileAndContentContainer = styled.div`
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

export const SavedVideosContentContainer = styled.div`
  padding-left: 20px;
  color: #475569;
`

export const SavedVideosCardTitle = styled.p`
  margin-top: 0px;
  line-height: 1.5;
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 20px;
  font-weight: bold;
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
`

export const SavedVideosStatsContainer = styled.div`
  margin: 0px;
  @media (max-width: 576px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

export const SavedVideosChannelName = styled.p`
  margin: 0px;
  @media (min-width: 668px) {
    margin-bottom: 6px;
  }
`

export const SavedVideosChannelDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SavedVideosViewsCount = styled.p`
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

export const SavedVideosPublished = styled.p`
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

export const NoSavedVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
  background-color: ${props => (props.darkTheme ? '#000000' : '#f4f4f4')};
`

export const NoSavedVideoImg = styled.img`
  width: 50%;
  margin-bottom: 40px;
  @media (max-width: 576px) {
    width: 80%;
  }
`

export const NoSavedVideoHeading = styled.h1`
  font-size: 24px;
`

export const NoSavedVideoDescription = styled.p``
