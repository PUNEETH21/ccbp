import {Component} from 'react'
import InterviewQuestion from '../InterviewQuestion'
import Filters from '../Filters'
import './index.css'

let filteredData
class InterviewQuestionsApp extends Component {
  state = {
    activeLanguage: 'ALL',
    activeDifficultLevel: 'ALL',
  }

  onChangeLanguage = language => {
    this.setState({activeLanguage: language})
  }

  onChangeLevel = level => {
    this.setState({activeDifficultLevel: level})
  }

  getFilteredQuestionsData = () => {
    const {questionsData} = this.props
    const {activeLanguage, activeDifficultLevel} = this.state
    if (activeLanguage === 'ALL' && activeDifficultLevel === 'ALL') {
      filteredData = questionsData
    } else if (activeLanguage === 'ALL' && activeDifficultLevel !== 'ALL') {
      filteredData = questionsData.filter(
        eachQuestion => eachQuestion.difficultyLevel === activeDifficultLevel,
      )
    } else if (activeLanguage !== 'ALL' && activeDifficultLevel === 'ALL') {
      filteredData = questionsData.filter(
        eachQuestion => eachQuestion.language === activeLanguage,
      )
    } else {
      filteredData = questionsData.filter(
        eachQuestion =>
          eachQuestion.language === activeLanguage &&
          eachQuestion.difficultyLevel === activeDifficultLevel,
      )
    }
    return filteredData
  }

  render() {
    const filteredQuestionsData = this.getFilteredQuestionsData()
    const {languageData, levelsData} = this.props
    return (
      <div className="app-container">
        <div className="header-section">
          <h1 className="main-heading">30 Seconds of Interviews</h1>
          <img
            className="header-image"
            src="https://assets.ccbp.in/frontend/react-js/interview-questions-img.png"
            alt="img"
          />
        </div>
        <div className="body-section">
          <Filters
            levelsData={levelsData}
            languageData={languageData}
            onChangeLanguage={this.onChangeLanguage}
            onChangeLevel={this.onChangeLevel}
          />
          {filteredQuestionsData.map(question => (
            <InterviewQuestion question={question} key={question.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default InterviewQuestionsApp
