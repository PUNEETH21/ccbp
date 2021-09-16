import {Component} from 'react'
import GradientDirectionItem from '../GradientDirectionItem'
import {
  AppContainer,
  MainHeading,
  TextTitle,
  UnorderedListItems,
  CustomInput,
  ColorName,
  InputsContainer,
  InputSection,
  GenerateButton,
} from './styledComponents'

const gradientDirectionsList = [
  {directionId: 'TOP', value: 'top', displayText: 'Top'},
  {directionId: 'BOTTOM', value: 'bottom', displayText: 'Bottom'},
  {directionId: 'RIGHT', value: 'right', displayText: 'Right'},
  {directionId: 'LEFT', value: 'left', displayText: 'Left'},
]
// Write your code here

class GradientGenerator extends Component {
  state = {
    directionInput: gradientDirectionsList[0].value,
    color1Input: '#8ae323',
    color2Input: '#014f7b',
    activeDirection: gradientDirectionsList[0].value,
    color1: '#8ae323',
    color2: '#014f7b',
  }

  onChangeDirectionId = directionInput => this.setState({directionInput})

  onChangeColor1Input = event =>
    this.setState({color1Input: event.target.value})

  onChangeColor2Input = event =>
    this.setState({color2Input: event.target.value})

  onClickGenerate = () => {
    const {color1Input, color2Input, directionInput} = this.state
    this.setState({
      color1: color1Input,
      color2: color2Input,
      activeDirection: directionInput,
    })
  }

  render() {
    const {
      directionInput,
      color1Input,
      color2Input,
      activeDirection,
      color1,
      color2,
    } = this.state
    return (
      <AppContainer
        data-testid="gradientGenerator"
        color1={color1}
        color2={color2}
        activeDirection={activeDirection}
      >
        <MainHeading>Generate a CSS Color Gradient</MainHeading>
        <TextTitle>Choose Direction</TextTitle>
        <UnorderedListItems>
          {gradientDirectionsList.map(gradientItem => {
            const isActive = gradientItem.value === directionInput
            return (
              <GradientDirectionItem
                gradientItem={gradientItem}
                isActive={isActive}
                onChangeDirectionId={this.onChangeDirectionId}
                key={gradientItem.directionId}
              />
            )
          })}
        </UnorderedListItems>
        <TextTitle>Pick the Colors</TextTitle>
        <InputsContainer>
          <InputSection>
            <ColorName>{color1Input}</ColorName>
            <CustomInput
              color={color1}
              value={color1Input}
              id="color1"
              type="color"
              onChange={this.onChangeColor1Input}
            />
          </InputSection>
          <InputSection>
            <ColorName>{color2Input}</ColorName>
            <CustomInput
              color={color2}
              value={color2Input}
              id="color2"
              type="color"
              onChange={this.onChangeColor2Input}
            />
          </InputSection>
        </InputsContainer>
        <GenerateButton onClick={this.onClickGenerate}>Generate</GenerateButton>
      </AppContainer>
    )
  }
}

export default GradientGenerator
