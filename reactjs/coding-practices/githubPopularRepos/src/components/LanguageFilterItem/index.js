import './index.css'

const LanguageFilterItem = props => {
  const {langaugeData, isActiveLanguage, onChangeActiveLanguage} = props
  const activeLanguageClassName = isActiveLanguage ? 'active-lang' : ''
  const onChangeLanguage = () => onChangeActiveLanguage(langaugeData.id)

  return (
    <li>
      <button
        className={`language ${activeLanguageClassName}`}
        onClick={onChangeLanguage}
        type="button"
      >
        {langaugeData.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
