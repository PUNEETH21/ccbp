import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => (props.darkTheme ? '#212121' : '#ffffff')};
`
export const HeaderLogo = styled.img`
  width: 120px;
`

export const HeaderOptionsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const UserProfile = styled.img`
  height: 25px;
  margin-left: 25px;
  margin-right: 25px;
`

export const LogoutButton = styled.button`
  background-color: transparent;
  padding-left: 10px;
  padding-right: 10px;
  color: ${props => (props.darkTheme ? '#ffffff' : '#4f46e5')};
  border: 2px solid ${props => (props.darkTheme ? '#ffffff' : '#4f46e5')};
  border-radius: 2px;
`
