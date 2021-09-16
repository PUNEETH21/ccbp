import {Component} from 'react'
import './index.css'

class Filters extends Component {
  getLanguageOptions = () => {
    const {languageData} = this.props
    return languageData.map(({id, language}) => (
      <option key={id} className="options" value={language}>
        {language}
      </option>
    ))
  }

  getLevelsOptions = () => {
    const {levelsData} = this.props
    return levelsData.map(({id, level}) => (
      <option key={id} className="options" value={level}>
        {level}
      </option>
    ))
  }

  onChangeLanguageOption = event => {
    const {onChangeLanguage} = this.props
    const {value} = event.target
    return onChangeLanguage(value)
  }

  onChangeLevelOption = event => {
    const {onChangeLevel} = this.props
    const {value} = event.target
    return onChangeLevel(value)
  }

  render() {
    // const {levelsData, languageData} = this.props
    return (
      <div className="select-filters">
        <div className="select-options">
          <label htmlFor="language">LANGUAGE</label>
          <select
            className="select-item"
            onChange={event => this.onChangeLanguageOption(event)}
          >
            {this.getLanguageOptions()}
          </select>
        </div>

        <div className="select-options">
          <label htmlFor="language">DIFFICULTY LEVEL</label>
          <select
            className="select-item"
            onChange={event => this.onChangeLevelOption(event)}
          >
            {this.getLevelsOptions()}
          </select>
        </div>
      </div>
    )
  }
}

export default Filters
