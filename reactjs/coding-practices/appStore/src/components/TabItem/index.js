import './index.css'

const TabItem = props => {
  const {tabItem, isActive, changeActiveTabId} = props
  const {tabId, displayText} = tabItem
  const activeTabClassName = isActive ? 'active-tab-btn' : ''
  const onClickTab = () => {
    changeActiveTabId(tabId)
  }

  return (
    <li className="tab-item">
      <button
        className={`btn tab-btn ${activeTabClassName}`}
        type="button"
        onClick={onClickTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
