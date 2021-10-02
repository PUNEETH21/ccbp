import styled from 'styled-components'

export const LoginFormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.darkTheme ? '#212121' : '#ffffff')};
`

export const LoginFormCard = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 6px;
  box-shadow: 0px 0px 6px #231f20;
  width: 400px;
  background-color: ${props => (props.darkTheme ? '#000000' : '#ffffff')};
  color: ${props => (props.darkTheme ? '#f4f4f4' : '#7e858e')};
  @media (max-width: 460px) {
    width: 90%;
  }
`

export const LoginWebsiteLogo = styled.img`
  width: 160px;
  align-self: center;
  margin-bottom: 20px;
`
export const LoginInputLabel = styled.label`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.darkTheme ? '#f4f4f4' : '#7e858e')};
`

export const LoginInput = styled.input`
  padding: 10px;
  outline: none;
  background-color: transparent;
  border: 1px solid #7e858e;
  border-radius: 2px;
  color: ${props => (props.darkTheme ? '#f4f4f4' : '#000000')};
`

export const ShowPasswordContainer = styled.div`
  display: flex;
  margin-top: 10px;
`

export const ShowPasswordInputLabel = styled.label`
  margin-left: 4px;
  color: ${props => (props.darkTheme ? '#f4f4f4' : '#000000')};
`

export const LoginErrorMsg = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin: 0px;
`

export const LoginButton = styled.button`
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 30px;
`
