import styled from 'styled-components/macro'

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding: 100px;
  font-family: 'Open Sans';
`

export const DescriptionContainer = styled.div`
  width: 30%;
`

export const MainHeading = styled.h1`
  color: #35469c;
`
export const CustomLabel = styled.label`
  color: #7e858e;
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`

export const CustomInput = styled.input`
  padding: 5px;
  margin-bottom: 12px;
`

export const CustomSelect = styled.select`
  padding: 5px;
  margin-bottom: 12px;
`

export const CustomOption = styled.option`
  padding: 5px;
  margin-bottom: 12px;
`

export const Generator = styled.button`
  background-color: #0b69ff;
  color: #ffffff;
  border-width: 0px;
  border-radius: 8px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  align-self: flex-start;
`

export const MemeContainer = styled.div`
  background-image: url(${props =>
    props.backgroundImage ? props.backgroundImage : ''});
  background-size: cover;
  min-height: 300px;
  order: 1;
  color: #ffffff;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const TextContent = styled.p`
  font-size: ${props => props.selectedFontSize}px;
`
