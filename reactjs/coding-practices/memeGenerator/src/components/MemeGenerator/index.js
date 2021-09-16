import {Component} from 'react'
import {
  AppContainer,
  DescriptionContainer,
  MainHeading,
  FormContainer,
  CustomLabel,
  CustomInput,
  CustomSelect,
  CustomOption,
  Generator,
  MemeContainer,
  TextContent,
} from './styledComponents'

const fontSizesOptionsList = [
  {
    optionId: '8',
    displayText: '8',
  },
  {
    optionId: '12',
    displayText: '12',
  },
  {
    optionId: '16',
    displayText: '16',
  },
  {
    optionId: '20',
    displayText: '20',
  },
  {
    optionId: '24',
    displayText: '24',
  },
  {
    optionId: '28',
    displayText: '28',
  },
  {
    optionId: '32',
    displayText: '32',
  },
]
// Write your code here

class MemeGenerator extends Component {
  state = {
    backgroundImageInput: '',
    topTextInput: '',
    bottomTextInput: '',
    optionId: fontSizesOptionsList[0].optionId,
    backgroundImage: '',
    topText: '',
    bottomText: '',
    selectedFontSize: '',
  }

  onChangeBgImgUrl = event =>
    this.setState({backgroundImageInput: event.target.value})

  onChangeTopText = event => this.setState({topTextInput: event.target.value})

  onChangeBottomText = event =>
    this.setState({bottomTextInput: event.target.value})

  onChangeOptionId = event => this.setState({optionId: event.target.value})

  onGenerateMeme = event => {
    event.preventDefault()
    const {
      backgroundImageInput,
      topTextInput,
      bottomTextInput,
      optionId,
    } = this.state

    this.setState({
      backgroundImage: backgroundImageInput,
      topText: topTextInput,
      bottomText: bottomTextInput,
      selectedFontSize: optionId,
    })
  }

  render() {
    const {
      backgroundImage,
      topText,
      bottomText,
      optionId,
      backgroundImageInput,
      topTextInput,
      bottomTextInput,
      selectedFontSize,
    } = this.state

    return (
      <AppContainer>
        <MemeContainer
          data-testid="meme"
          backgroundImage={backgroundImage}
          fontSize={selectedFontSize}
        >
          <TextContent selectedFontSize={selectedFontSize}>
            {topText}
          </TextContent>
          <TextContent selectedFontSize={selectedFontSize}>
            {bottomText}
          </TextContent>
        </MemeContainer>
        <DescriptionContainer>
          <MainHeading>Meme Generator</MainHeading>
          <FormContainer onSubmit={this.onGenerateMeme}>
            <CustomLabel htmlFor="backgroundImgUrl">Image URL</CustomLabel>
            <CustomInput
              type="text"
              id="backgroundImgUrl"
              placeholder="Enter the image URL"
              value={backgroundImageInput}
              onChange={this.onChangeBgImgUrl}
            />
            <CustomLabel htmlFor="topText">Top Text</CustomLabel>
            <CustomInput
              type="text"
              id="topText"
              value={topTextInput}
              placeholder="Enter the Top Text"
              onChange={this.onChangeTopText}
            />
            <CustomLabel htmlFor="bottomText">Bottom Text</CustomLabel>
            <CustomInput
              type="text"
              id="bottomText"
              value={bottomTextInput}
              placeholder="Enter the Bottom Text"
              onChange={this.onChangeBottomText}
            />
            <CustomLabel htmlFor="select">Font Size</CustomLabel>
            <CustomSelect
              id="select"
              value={optionId}
              onChange={this.onChangeOptionId}
            >
              {fontSizesOptionsList.map(fontOptions => (
                <CustomOption
                  key={fontOptions.optionId}
                  value={fontOptions.optionId}
                >
                  {fontOptions.displayText}
                </CustomOption>
              ))}
            </CustomSelect>
            <Generator type="submit">Generate</Generator>
          </FormContainer>
        </DescriptionContainer>
      </AppContainer>
    )
  }
}

export default MemeGenerator
