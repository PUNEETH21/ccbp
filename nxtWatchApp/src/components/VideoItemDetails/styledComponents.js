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

export const VideoItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
`

export const VideoItemDetailsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.darkTheme ? '#ffffff' : '#212121')};
`

export const VideoCardTitle = styled.p`
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
`

export const VideoCardCountAndOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #475569;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

export const VideoCardCountDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  list-style-type: none;
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
  }
`

export const VideoCardOptionsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const OptionContainer = styled.div`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: flex-start;
  padding: 0px;
  color: ${props =>
    props.isLiked === true ||
    props.isDisliked === true ||
    props.isSaved === true
      ? '#2563eb'
      : '#64748b'};
  @media (max-width: 768px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

export const IconButtonText = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: flex-start;
  padding: 0px;
  color: ${props =>
    props.isLiked === true ||
    props.isDisliked === true ||
    props.isSaved === true
      ? '#2563eb'
      : '#64748b'};
  @media (max-width: 768px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  font-size: 15px;
  font-weight: 600;
  margin-left: 6px;
  margin-right: 20px;
`

export const LineBreak = styled.hr`
  width: 100%;
  border: 1px solid #475569;
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
  @media (max-width: 768px) {
    padding-bottom: 0px;
    margin: 0px;
  }
`

export const VideoItemCardChannelName = styled.p`
  margin-top: 0px;
  margin-bottom: 6px;
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
`

export const VideoItemCardChannelSubscribersCount = styled.p`
  color: #475569;
  margin-top: 0px;
  margin-bottom: 10px;
`

export const VideoItemCardDescription = styled.p`
  margin: 0px;
  @media (max-width: 768px) {
    display: none;
  }
`

export const MobileVideoItemCardDescription = styled.p`
  margin: 0px;
  @media (min-width: 768px) {
    display: none;
  }
`
