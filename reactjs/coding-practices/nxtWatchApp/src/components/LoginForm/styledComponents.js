import styled from 'styled-components'

export const LoginFormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginFormCard = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-shadow: 0px 0px 10px black;
  width: 400px;
`

export const LoginWebsiteLogo = styled.img`
  width: 160px;
  align-self: center;
  margin-bottom: 20px;
`

export const LoginInputLabel = styled.label`
  margin-top: 20px;
`

export const LoginInput = styled.input`
  padding: 10px;
  outline: none;
`

export const ShowPasswordContainer = styled.div`
  display: flex;
`

export const ShowPasswordInputLabel = styled.label``

export const LoginErrorMsg = styled.p`
  color: #ff0000;
`

export const LoginButton = styled.button`
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 20px;
`
