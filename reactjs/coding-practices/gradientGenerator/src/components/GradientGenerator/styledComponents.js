import styled from 'styled-components'

export const AppContainer = styled.div`
  font-family: 'Roboto';
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-image: linear-gradient(
    to ${props => props.activeDirection},
    ${props => props.color1},
    ${props => props.color2}
  );
`

export const MainHeading = styled.h1`
  //   color: #ffffff;
`

export const TextTitle = styled.p`
  font-size: 24px;
`

export const UnorderedListItems = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding-left: 0px;
`

export const CustomInput = styled.input`
  background-color: ${props => props.color};
  width: 100px;
  height: 50px;
  border: none;
  border-width: 0px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
`

export const ColorName = styled.p`
  padding: 0px;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20%;
`

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const GenerateButton = styled.button`
  border-width: 0px;
  border-radius: 10px;
  background-color: #00c9b7;
  margin-top: 30px;
  font-weight: bold;
  padding: 10px;
`
