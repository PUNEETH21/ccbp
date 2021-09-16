import {Component} from 'react'
import './index.css'

class InterviewQuestion extends Component {
  state = {isAnswerHidden: true}

  renderAnswer = () => {
    const {question} = this.props
    const {answerText} = question
    const {isAnswerHidden} = this.state

    if (!isAnswerHidden) {
      return <p className="answer-text"> {answerText} </p>
    }
    return null
  }

  renderLanguageClassName = language => {
    let languageClassName
    if (language === 'HTML') {
      languageClassName = 'html-lan'
    } else if (language === 'CSS') {
      languageClassName = 'css-lan'
    } else {
      languageClassName = 'js-lan'
    }
    return languageClassName
  }

  renderLevelClassName = language => {
    let levelClassName
    if (language === 'EASY') {
      levelClassName = 'easy-level'
    } else if (language === 'MEDIUM') {
      levelClassName = 'medium-level'
    } else {
      levelClassName = 'hard-level'
    }
    return levelClassName
  }

  onToggleAnswer = () => {
    this.setState(prevState => ({
      isAnswerHidden: !prevState.isAnswerHidden,
    }))
  }

  render() {
    const {question} = this.props
    const {questionText, language, difficultyLevel} = question
    const {isAnswerHidden} = this.state
    const imgUrl = isAnswerHidden
      ? 'https://assets.ccbp.in/frontend/react-js/down-arrow.png'
      : 'https://assets.ccbp.in/frontend/react-js/up-arrow.png'

    const altText = isAnswerHidden ? 'down arrow' : 'up arrow'

    return (
      <div className="questions-container">
        <div className="question-card-container">
          <div className="options-status-container">
            <span
              className={`${this.renderLanguageClassName(
                language,
              )} selected-option`}
            >
              {language}
            </span>
            <span
              className={`${this.renderLevelClassName(
                difficultyLevel,
              )} selected-option`}
            >
              {difficultyLevel}
            </span>
          </div>
          <h1>{questionText}</h1>
          <button
            className="answer-options"
            type="button"
            onClick={this.onToggleAnswer}
          >
            {isAnswerHidden ? 'Show' : 'Hide'}
            <img className="image" src={imgUrl} alt={altText} />
          </button>
          {this.renderAnswer()}
        </div>
      </div>
    )
  }
}

export default InterviewQuestion
