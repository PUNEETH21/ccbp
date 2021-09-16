import styled from 'styled-components'

export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.darkTheme ? '#212121' : '#ffffff')};
  min-height: 100vh;
  width: 20%;
  color: ${props => (props.darkTheme ? '#ffffff' : '#212121')};
  padding: 20px;
  align-self: stretch;
`

export const NavbarListItemsContainer = styled.ul`
  list-style-type: none;
  padding-left: 0px;
`

export const NavbarListItemContainer = styled.li`
  display: flex;
  align-items: center;
`
export const NavLinkContent = styled.p`
  margin-left: 15px;
`

export const ContactSection = styled.div``

export const ContactHeading = styled.h1`
  font-size: 18px;
`

export const SocialMediaSection = styled.div`
  display: flex;
`
export const SocialMediaIcon = styled.img`
  height: 40px;
  margin-right: 12px;
`

export const ContactDescription = styled.p`
  font-weight: bold;
`
