import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-top: 10px;
  padding-bottom: 20px;
  width: 100%;
`

export const WebsiteLogo = styled.img`
  height: 40px;
`

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

export const Button = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
`

export const CancelButton = styled(Button)`
  align-self: flex-end;
  align-self: stretch;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-right: 15px;
`

export const NavLinksList = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
`

export const NavLinkItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

export const NavLinkContent = styled.p`
  font-size: 30px;
  font-family: 'Roboto'
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 0px;
`

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`
