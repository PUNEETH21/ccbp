import styled from 'styled-components'

export const GradientItem = styled.li`
  margin-right: 10px;
`

export const DirectionButton = styled.button`
  background-color: ${props => (props.isActive ? '#ffffff' : '#00c9b7')};
  width: 100px;
  height: 40px;
  font-weight: bold;
  border-radius: 10px;
  border-width: 0px;
  opacity: ${props => (props.isActive ? 1 : 0.5)};
`
