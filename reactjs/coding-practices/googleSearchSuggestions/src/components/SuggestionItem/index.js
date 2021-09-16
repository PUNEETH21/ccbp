import './index.css'

const SuggestionItem = props => {
  const {suggestionItem, getSelectedInput} = props
  const {suggestion} = suggestionItem

  const getChoosenInput = () => {
    getSelectedInput(suggestion)
  }
  return (
    <li className="list-item">
      <p>{suggestion}</p>
      <button type="button" className="arrow-button" onClick={getChoosenInput}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
          alt="arrow"
          className="arrow"
        />
      </button>
    </li>
  )
}

export default SuggestionItem
