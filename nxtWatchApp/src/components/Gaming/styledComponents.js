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

export const GamingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const GamingTopSection = styled.div`
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

export const GamingIconSection = styled.div`
  padding: 20px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${props => (props.darkTheme ? '#181818' : '#d7dfe9')};
`

export const GamingTitle = styled.h1`
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`

export const GamingVideosListContainer = styled.ul`
  list-style-type: none;
  padding-left: 60px;
  padding-top: 60px;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
  @media (max-width: 768px) {
    padding: 30px;
  }
`

export const GamingVideoCardItem = styled.li`
  margin-right: 30px;
  margin-bottom: 60px;
  @media (max-width: 520px) {
    width: 100%;
    margin-right: 0px;
  }
`

export const GamingVideoImg = styled.img`
  height: 300px;
  max-width: 220px;
  margin-bottom: 10px;
  @media (max-width: 530px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border: 2px solid blue;
  }
`

export const GamingVideoCardTitle = styled.h1`
  margin-top: 0px;
  line-height: 1.5;
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 20px;
  font-weight: bold;
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
`

export const GamingVideoChannelName = styled.p`
  margin-top: 0px;
  margin-bottom: 6px;
`

export const GamingVideoChannelDetails = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  list-style-type: none;
`

export const GamingVideoViewsCount = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  color: #475569;
`
